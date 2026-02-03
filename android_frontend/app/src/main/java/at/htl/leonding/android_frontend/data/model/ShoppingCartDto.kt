// FILE: data/model/ShoppingCartDto.kt
package at.htl.leonding.android_frontend.data.model

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class ShoppingCartDto(
    val id: Long,
    val cpu: CpuDto? = null,
    val motherboard: Any? = null,
    val gpu: Any? = null,
    val ram: Any? = null,
    @Json(name = "cases") val case: Any? = null,
    val powersupply: Any? = null,
    val internalHardddrive: Any? = null,
    val cpuCooler: Any? = null,
    val totalPrice: Double? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)