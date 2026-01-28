package at.htl.leonding.android_frontend.data.repo

import at.htl.leonding.android_frontend.data.model.CpuDto

interface PcRepository {
    suspend fun getCpus(): List<CpuDto>

    suspend fun updateCart(
        shoppingCartId: Long,
        component: String,
        componentId: Long
    )
}