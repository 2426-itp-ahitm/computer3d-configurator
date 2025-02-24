package at.ac.htl.features.shoppingcart;

import at.ac.htl.features.cpu.CPUMapper;
import at.ac.htl.features.motherboard.MotherboardMapper;
import at.ac.htl.features.gpu.GPUMapper;
import at.ac.htl.features.ram.RAMMapper;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ShoppingCartMapper {

    private final CPUMapper cpuMapper;
    private final MotherboardMapper motherboardMapper;
    private final GPUMapper gpuMapper;
    private final RAMMapper ramMapper;

    public ShoppingCartMapper(CPUMapper cpuMapper,
                              MotherboardMapper motherboardMapper,
                              GPUMapper gpuMapper,
                              RAMMapper ramMapper) {
        this.cpuMapper = cpuMapper;
        this.motherboardMapper = motherboardMapper;
        this.gpuMapper = gpuMapper;
        this.ramMapper = ramMapper;
    }

    public ShoppingCartDto toDto(ShoppingCart cart) {
        return new ShoppingCartDto(
            cart.getId(),
            cart.getCpu() != null ? cpuMapper.toResource(cart.getCpu()) : null,
            cart.getMotherboard() != null ? motherboardMapper.toResource(cart.getMotherboard()) : null,
            cart.getGpu() != null ? gpuMapper.toResource(cart.getGpu()) : null,
            cart.getRam() != null ? ramMapper.toResource(cart.getRam()) : null,
            cart.getTotalPrice(),
            cart.getCreatedAt(),
            cart.getUpdatedAt()
        );
    }
}
