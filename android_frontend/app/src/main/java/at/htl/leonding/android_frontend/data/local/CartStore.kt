// FILE: data/local/CartStore.kt
package at.htl.leonding.android_frontend.data.local

import android.content.Context
import androidx.datastore.preferences.core.longPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map

private val Context.dataStore by preferencesDataStore(name = "app_prefs")

class CartStore(private val context: Context) {
    private val CART_ID = longPreferencesKey("cart_id")

    suspend fun getCartId(): Long? =
        context.dataStore.data.map { it[CART_ID] }.first()

    suspend fun setCartId(id: Long) {
        context.dataStore.edit { it[CART_ID] = id }
    }

    suspend fun clearCartId() {
        context.dataStore.edit { it.remove(CART_ID) }
    }
}