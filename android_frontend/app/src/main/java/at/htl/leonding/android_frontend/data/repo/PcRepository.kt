package at.htl.leonding.android_frontend.data.repo

import at.htl.leonding.android_frontend.data.model.CpuCoolerDto
import at.htl.leonding.android_frontend.data.model.CpuDto
import at.htl.leonding.android_frontend.data.model.GpuDto
import at.htl.leonding.android_frontend.data.model.HarddriveDto
import at.htl.leonding.android_frontend.data.model.MotherboardDto
import at.htl.leonding.android_frontend.data.model.PowerSupplyDto
import at.htl.leonding.android_frontend.data.model.RamDto
import at.htl.leonding.android_frontend.data.model.ShoppingCartDto
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListItem
import at.htl.leonding.android_frontend.ui.screens.components.mapper.toListItem

interface PcRepository {
    suspend fun getCpus(): List<CpuDto>
    suspend fun getGpus(): List<GpuDto>
    suspend fun getHarddrives(): List<HarddriveDto>
    suspend fun getPowerSupplies(): List<PowerSupplyDto>
    suspend fun getCpuCoolers(): List<CpuCoolerDto>
    suspend fun getMotherboards(): List<MotherboardDto>
    suspend fun getRams(): List<RamDto>

    suspend fun getCart(id: Long): ShoppingCartDto
    //suspend fun createCart(): ShoppingCartDto

    suspend fun updateCart(
        shoppingCartId: Long,
        component: String,
        componentId: Long
    )

    suspend fun getAllComponents(): List<ComponentListItem> {
        // Alle Requests parallel oder nacheinander starten
        val cpus = getCpus().map { it.toListItem().copy(type = "cpu") }
        val gpus = getGpus().map { it.toListItem().copy(type = "gpu") }
        val rams = getRams().map { it.toListItem().copy(type = "ram") }
        // ... füge hier alle anderen Typen (Motherboard, PSU, etc.) hinzu

        return cpus + gpus + rams // + ...
    }
}