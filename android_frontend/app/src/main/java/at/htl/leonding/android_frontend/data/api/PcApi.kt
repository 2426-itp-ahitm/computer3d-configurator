package at.htl.leonding.android_frontend.data.api

import at.htl.leonding.android_frontend.data.model.ShoppingCartDto
import retrofit2.Response
import retrofit2.http.*

interface PcApi {

    @GET("cpus")
    suspend fun getCpus(): List<at.htl.leonding.android_frontend.data.model.CpuDto>

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