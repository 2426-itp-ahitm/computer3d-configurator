// FILE: data/model/ShoppingCartDto.kt
package at.htl.leonding.android_frontend.data.model

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

data class ShoppingCartDto(
    @Json(name = "id") val id: Long,
    @Json(name = "totalPrice") val totalPrice: Double? = 0.0,
    @Json(name = "cpu") val cpu: CpuDto?,
    @Json(name = "gpu") val gpu: GpuDto?,
    @Json(name = "ram") val ram: RamDto?,
    @Json(name = "motherboard") val motherboard: MotherboardDto?,
    @Json(name = "internalHarddrive") val storage: HarddriveDto?,
    @Json(name = "powersupply") val psu: PowerSupplyDto?,
    @Json(name = "cpuCooler") val cooler: CpuCoolerDto?
) {
    fun getItemCount(): Int {
        return listOf(cpu, gpu, ram, motherboard, storage, psu, cooler)
            .count { it != null }
    }
}
