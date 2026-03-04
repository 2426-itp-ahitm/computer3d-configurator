package at.htl.leonding.android_frontend.data.repo

import at.htl.leonding.android_frontend.data.api.PcApi
import at.htl.leonding.android_frontend.data.model.CpuDto
import at.htl.leonding.android_frontend.data.model.ShoppingCartDto

class PcRepositoryImpl(private val api: PcApi) : PcRepository {

    override suspend fun getCpus() = api.getCpus()
    override suspend fun getGpus() = api.getGpus()
    override suspend fun getHarddrives() = api.getHarddrives()
    override suspend fun getPowerSupplies() = api.getPowerSupplies()
    override suspend fun getCpuCoolers() = api.getCpuCoolers()
    override suspend fun getMotherboards() = api.getMotherboards()
    override suspend fun getRams() = api.getRams()

    override suspend fun getCart(id: Long): ShoppingCartDto = api.getCart(id)

    //override suspend fun createCart(): ShoppingCartDto = api.createCart()

    override suspend fun updateCart(shoppingCartId: Long, component: String, componentId: Long) {
        val res = api.updateCart(shoppingCartId, component, componentId)
        if (!res.isSuccessful) throw IllegalStateException("updateCart failed: HTTP ${res.code()}")
    }
}