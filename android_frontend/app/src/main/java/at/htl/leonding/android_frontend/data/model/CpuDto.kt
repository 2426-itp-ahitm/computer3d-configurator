package at.htl.leonding.android_frontend.data.model

import com.squareup.moshi.Json

data class CpuDto(
    @Json(name = "cpu_id") val cpuId: Long,
    @Json(name = "name") val name: String,
    @Json(name = "price") val price: Double,
    @Json(name = "core_count") val coreCount: Int,
    @Json(name = "core_clock") val coreClock: Double,
    @Json(name = "boost_clock") val boostClock: Double,
    @Json(name = "tdp") val tdp: Int,
    @Json(name = "graphics") val graphics: String?,
    @Json(name = "smt") val smt: Boolean,
    @Json(name = "socket") val socket: String,
    @Json(name = "img") val img: String?,
    @Json(name = "model") val model: String?
)
