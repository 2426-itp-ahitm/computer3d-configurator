package at.htl.leonding.android_frontend.data.model

import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class ShoppingCartDto(
    val id: Long,
    val cpu: CpuDto? = null,
    val totalPrice: Double? = null
)