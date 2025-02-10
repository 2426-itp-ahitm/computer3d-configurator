package at.ac.htl.features.shoppingcart;

import at.ac.htl.features.cpu.CPUDto;
import at.ac.htl.features.motherboard.MotherboardDto;
import at.ac.htl.features.gpu.GPUDto;
import at.ac.htl.features.ram.RAMDto;
import java.time.LocalDateTime;

public record ShoppingCartDto(
    Long id,
    CPUDto cpu,
    MotherboardDto motherboard,
    GPUDto gpu,
    RAMDto ram,
    Double totalPrice,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    
}
