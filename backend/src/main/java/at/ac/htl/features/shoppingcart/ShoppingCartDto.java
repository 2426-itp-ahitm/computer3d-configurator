package at.ac.htl.features.shoppingcart;

import at.ac.htl.features.casing.Case;
import at.ac.htl.features.casing.CaseDto;
import at.ac.htl.features.cpu.CPUDto;
import at.ac.htl.features.cpuCooler.CpuCoolerDto;
import at.ac.htl.features.internalHarddrive.InternalHarddrive;
import at.ac.htl.features.internalHarddrive.InternalHarddriveDto;
import at.ac.htl.features.motherboard.MotherboardDto;
import at.ac.htl.features.gpu.GPUDto;
import at.ac.htl.features.powersupply.PowersupplyDto;
import at.ac.htl.features.ram.RAMDto;
import java.time.LocalDateTime;

public record ShoppingCartDto(
    Long id,
    CPUDto cpu,
    MotherboardDto motherboard,
    GPUDto gpu,
    RAMDto ram,
    CaseDto cases,
    PowersupplyDto powersupply,
    InternalHarddriveDto internalHarddrive,
    CpuCoolerDto cpuCooler,
    Double totalPrice,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    
}
