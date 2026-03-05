package at.htl.leonding.android_frontend

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import at.htl.leonding.android_frontend.auth.HttpConnectionBuilder
import at.htl.leonding.android_frontend.auth.TokenPrefs
import at.htl.leonding.android_frontend.auth.TokenStore
import net.openid.appauth.AppAuthConfiguration
import net.openid.appauth.AuthorizationException
import net.openid.appauth.AuthorizationRequest
import net.openid.appauth.AuthorizationResponse
import net.openid.appauth.AuthorizationService
import net.openid.appauth.AuthorizationServiceConfiguration
import net.openid.appauth.ResponseTypeValues

class MainActivity : ComponentActivity() {

    private lateinit var authService: AuthorizationService
    private lateinit var tokenPrefs: TokenPrefs

    private val RC_AUTH = 100

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val appAuthConfig = AppAuthConfiguration.Builder()
            .setConnectionBuilder(HttpConnectionBuilder) // erlaubt http://...
            .build()

        authService = AuthorizationService(this, appAuthConfig)
        tokenPrefs = TokenPrefs(this)

        TokenStore.accessToken = tokenPrefs.loadAccessToken()

        setContent { App() }

        if (TokenStore.accessToken.isNullOrBlank()) {
            startLogin()
        }
    }

    private fun startLogin() {
        val authEndpoint =
            Uri.parse("http://localhost:8000/realms/PcConfigurator/protocol/openid-connect/auth")
        val tokenEndpoint =
            Uri.parse("http://localhost:8000/realms/PcConfigurator/protocol/openid-connect/token")

        val config = AuthorizationServiceConfiguration(authEndpoint, tokenEndpoint)

        val redirectUri = Uri.parse("at.htl.leonding.android-frontend://oauth2redirect")

        val request = AuthorizationRequest.Builder(
            config,
            "android-client",
            ResponseTypeValues.CODE,
            redirectUri
        )
            .setScope("openid profile email offline_access")
            .build()

        val intent = authService.getAuthorizationRequestIntent(request)
        startActivityForResult(intent, RC_AUTH)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode != RC_AUTH || data == null) return

        val resp = AuthorizationResponse.fromIntent(data)
        val ex = AuthorizationException.fromIntent(data)

        if (ex != null || resp == null) {
            startLogin()
            return
        }

        val tokenReq = resp.createTokenExchangeRequest()

        authService.performTokenRequest(tokenReq) { tokenResp, tokenEx ->
            if (tokenEx != null) {
                startLogin()
                return@performTokenRequest
            }

            val accessToken = tokenResp?.accessToken
            if (accessToken.isNullOrBlank()) {
                startLogin()
                return@performTokenRequest
            }

            TokenStore.accessToken = accessToken
            tokenPrefs.saveAccessToken(accessToken)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        authService.dispose()
    }
}