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

    suspend fun getCartId(): Long? {
        return context.dataStore.data
            .map { preferences ->
                preferences[CART_ID]
            }.first()
    }

    suspend fun setCartId(id: Long) {
        context.dataStore.edit { preferences ->
            preferences[CART_ID] = id
        }
    }

    suspend fun clearCartId() {
        context.dataStore.edit { preferences ->
            preferences.remove(CART_ID)
        }
    }
}