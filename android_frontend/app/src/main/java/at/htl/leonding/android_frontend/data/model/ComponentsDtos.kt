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

data class GpuDto(
    @Json(name = "gpu_id") val id: Long,
    @Json(name = "name") val name: String,
    @Json(name = "price") val price: Double,
    @Json(name = "chipset") val chipset: String,
    @Json(name = "memory") val memory: Int,
    @Json(name = "core_clock") val coreClock: Int,
    @Json(name = "boost_clock") val boostClock: Int?,
    @Json(name = "color") val color: String?,
    @Json(name = "length") val length: Int,
    @Json(name = "img") val img: String?,
    @Json(name = "model") val model: String?
)

data class HarddriveDto(
    @Json(name = "internalHarddrive_id") val id: Long,
    @Json(name = "name") val name: String,
    @Json(name = "price") val price: Double,
    @Json(name = "capacity") val capacity: Int,
    @Json(name = "type") val type: String,
    @Json(name = "formFactor") val formFactor: String,
    @Json(name = "memoryInterface") val memoryInterface: String?,
    @Json(name = "img") val img: String?,
    @Json(name = "model") val model: String?
)

data class PowerSupplyDto(
    @Json(name = "powersupply_id") val id: Long,
    @Json(name = "name") val name: String,
    @Json(name = "price") val price: Double,
    @Json(name = "type") val type: String,
    @Json(name = "efficiency") val efficiency: String?,
    @Json(name = "wattage") val wattage: Int,
    @Json(name = "modular") val modular: String?,
    @Json(name = "img") val img: String?,
    @Json(name = "model") val model: String?
)

data class CpuCoolerDto(
    @Json(name = "cpu_cooler_id") val id: Long,
    @Json(name = "name") val name: String,
    @Json(name = "price") val price: Double,
    @Json(name = "max_rpm") val maxRpm: Int?,
    @Json(name = "max_noise_level") val maxNoise: Double?,
    @Json(name = "img") val img: String?,
    @Json(name = "model") val model: String?
)

data class MotherboardDto(
    @Json(name = "motherboard_id") val id: Long,
    @Json(name = "name") val name: String,
    @Json(name = "price") val price: Double,
    @Json(name = "socket") val socket: String,
    @Json(name = "ramType") val ramType: String,
    @Json(name = "form_factor") val formFactor: String,
    @Json(name = "max_memory") val maxMemory: Int?,
    @Json(name = "img") val img: String?,
    @Json(name = "model") val model: String?
)

data class RamDto(
    @Json(name = "ram_id") val id: Long,
    @Json(name = "name") val name: String,
    @Json(name = "price") val price: Double?,
    @Json(name = "type") val type: String,
    @Json(name = "clock_speed") val clockSpeed: Int,
    @Json(name = "module_count") val moduleCount: Int,
    @Json(name = "gb_per_module") val gbPerModule: Int,
    @Json(name = "cas_latency") val casLatency: Int?,
    @Json(name = "img") val img: String?,
    @Json(name = "model") val model: String?
)