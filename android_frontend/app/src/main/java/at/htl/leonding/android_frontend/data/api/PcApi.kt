package at.htl.leonding.android_frontend.data.api

import at.htl.leonding.android_frontend.data.model.CpuDto
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path


interface PcApi {

    // CPU Liste
    @GET("cpus")
    suspend fun getCpus(): List<CpuDto>


}