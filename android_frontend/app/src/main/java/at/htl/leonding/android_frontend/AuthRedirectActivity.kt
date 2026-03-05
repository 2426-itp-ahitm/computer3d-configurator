package at.htl.leonding.android_frontend

import android.app.Activity
import android.content.Intent
import android.os.Bundle

class AuthRedirectActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // leitet den Redirect Intent an MainActivity weiter
        val forward = Intent(this, MainActivity::class.java).apply {
            action = intent.action
            data = intent.data
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
        }
        startActivity(forward)
        finish()
    }
}