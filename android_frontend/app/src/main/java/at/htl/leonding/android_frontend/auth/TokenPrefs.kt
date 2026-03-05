package at.htl.leonding.android_frontend.auth

import android.content.Context

class TokenPrefs(context: Context) {
    private val prefs = context.getSharedPreferences("auth", Context.MODE_PRIVATE)

    fun saveAccessToken(token: String) {
        prefs.edit().putString("access_token", token).apply()
    }

    fun loadAccessToken(): String? {
        return prefs.getString("access_token", null)
    }

    fun clear() {
        prefs.edit().clear().apply()
    }
}