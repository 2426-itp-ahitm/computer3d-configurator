package at.htl.leonding.android_frontend.data.api

import at.htl.leonding.android_frontend.data.model.CpuCoolerDto
import at.htl.leonding.android_frontend.data.model.CpuDto
import at.htl.leonding.android_frontend.data.model.GpuDto
import at.htl.leonding.android_frontend.data.model.HarddriveDto
import at.htl.leonding.android_frontend.data.model.MotherboardDto
import at.htl.leonding.android_frontend.data.model.PowerSupplyDto
import at.htl.leonding.android_frontend.data.model.RamDto
import at.htl.leonding.android_frontend.data.model.ShoppingCartDto
import retrofit2.Response
import retrofit2.http.*

interface PcApi {

    @GET("cpus")
    suspend fun getCpus(): List<CpuDto>

    @GET("gpus")
    suspend fun getGpus(): List<GpuDto>

    @GET("internalharddrive") // Pfad ggf. an Backend anpassen
    suspend fun getHarddrives(): List<HarddriveDto>

    @GET("powersupply")
    suspend fun getPowerSupplies(): List<PowerSupplyDto>

    @GET("cpu-cooler")
    suspend fun getCpuCoolers(): List<CpuCoolerDto>

    @GET("motherboards")
    suspend fun getMotherboards(): List<MotherboardDto>

    @GET("rams")
    suspend fun getRams(): List<RamDto>


    @GET("shoppingcart/get-by-id/{id}")
    suspend fun getCart(@Path("id") id: Long): ShoppingCartDto

    //@POST("shoppingcart/createShoppingCart")
    //suspend fun createCart(@Body body: Map<String, Any?> = emptyMap()): ShoppingCartDto

    @PUT("shoppingcart/update-cart/{shoppingCartId}/{component}/{idComponent}")
    suspend fun updateCart(
        @Path("shoppingCartId") shoppingCartId: Long,
        @Path("component") component: String,
        @Path("idComponent") idComponent: Long
    ): Response<Unit>
}