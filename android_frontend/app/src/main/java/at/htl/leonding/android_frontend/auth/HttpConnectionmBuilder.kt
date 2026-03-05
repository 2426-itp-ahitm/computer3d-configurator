package at.htl.leonding.android_frontend.auth

import net.openid.appauth.connectivity.ConnectionBuilder
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL

object HttpConnectionBuilder : ConnectionBuilder {
    override fun openConnection(uri: android.net.Uri): HttpURLConnection {
        val conn = URL(uri.toString()).openConnection() as HttpURLConnection
        conn.instanceFollowRedirects = false
        return conn
    }
}