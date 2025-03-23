package at.ac.htl.features.shoppingcart;

import at.ac.htl.features.casing.CaseMapper;
import at.ac.htl.features.cpu.CPUMapper;
import at.ac.htl.features.cpuCooler.CpuCooler;
import at.ac.htl.features.cpuCooler.CpuCoolerMapper;
import at.ac.htl.features.internalHarddrive.InternalHarddrive;
import at.ac.htl.features.internalHarddrive.InternalHarddriveMapper;
import at.ac.htl.features.motherboard.MotherboardMapper;
import at.ac.htl.features.gpu.GPUMapper;
import at.ac.htl.features.powersupply.PowersupplyMapper;
import at.ac.htl.features.ram.RAMMapper;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ShoppingCartMapper {

    private final CPUMapper cpuMapper;
    private final MotherboardMapper motherboardMapper;
    private final GPUMapper gpuMapper;
    private final RAMMapper ramMapper;
    private final CaseMapper caseMapper;
    private final PowersupplyMapper powersupplyMapper;
    private final InternalHarddriveMapper internalHarddriveMapper;
    private final CpuCoolerMapper cpuCoolerMapper;

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
            cart.getComputerCase() != null ? caseMapper.toResource(cart.getComputerCase()):null,
            cart.getPowersupply() != null ? powersupplyMapper.toResource(cart.getPowersupply()) : null,
            cart.getInternalHarddrive() != null ? internalHarddriveMapper.toResource(cart.getInternalHarddrive()) : null,
            cart.getCpuCooler() != null ? cpuCoolerMapper.toResource(cart.getCpuCooler()) : null,
            cart.getTotalPrice(),
            cart.getCreatedAt(),
            cart.getUpdatedAt()
        );
    }


    public Object toRessource(ShoppingCart shoppingCart) {
        return toDto(shoppingCart);
    }
}
