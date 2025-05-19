package at.ac.htl.features.gpu;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GPUMapper {
    public GPUDto toResource(GPU gpu) {
        return new GPUDto(
                gpu.gpu_id,
                gpu.name,
                gpu.price,
                gpu.chipset,
                gpu.memory,
                gpu.core_clock,
                gpu.boost_clock,
                gpu.color,
                gpu.length,
                gpu.img,
                gpu.model
        );
    }
}
