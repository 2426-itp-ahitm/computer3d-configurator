package at.htl.leonding.android_frontend.data.repo

import at.htl.leonding.android_frontend.data.api.PcApi
import at.htl.leonding.android_frontend.data.model.CpuDto

class PcRepositoryImpl(
    private val api: PcApi
) : PcRepository {

    override suspend fun getCpus(): List<CpuDto> = api.getCpus()

    override suspend fun updateCart(
        shoppingCartId: Long,
        component: String,
        componentId: Long
    ) {
        val res = api.updateCart(
            shoppingCartId = shoppingCartId,
            component = component,
            idComponent = componentId
        )
        if (!res.isSuccessful) {
            throw IllegalStateException("updateCart failed: HTTP ${res.code()}")
        }
    }
}