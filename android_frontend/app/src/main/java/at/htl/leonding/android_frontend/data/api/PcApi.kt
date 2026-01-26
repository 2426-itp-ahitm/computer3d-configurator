package at.htl.leonding.android_frontend.data.api


import at.htl.leonding.android_frontend.data.model.CpuDto
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.PUT
import retrofit2.http.Path


interface PcApi {


    @GET("cpus")
    suspend fun getCpus(): List<CpuDto>


    @PUT("shoppingcart/update-cart/{shoppingCartId}/{component}/{idComponent}")
    suspend fun updateCart(
        @Path("shoppingCartId") shoppingCartId: Long,
        @Path("component") component: String,
        @Path("idComponent") idComponent: Long
    ): Response<Unit>
}