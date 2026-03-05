package at.htl.leonding.android_frontend.auth

object TokenStore {
    @Volatile var accessToken: String? = null
}