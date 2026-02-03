package at.htl.leonding.android_frontend.data.repo

import at.htl.leonding.android_frontend.data.model.ShoppingCartDto

interface PcRepository {
    suspend fun getCpus(): List<at.htl.leonding.android_frontend.data.model.CpuDto>

    suspend fun getCart(id: Long): ShoppingCartDto
    //suspend fun createCart(): ShoppingCartDto

    suspend fun updateCart(
        shoppingCartId: Long,
        component: String,
        componentId: Long
    )
}