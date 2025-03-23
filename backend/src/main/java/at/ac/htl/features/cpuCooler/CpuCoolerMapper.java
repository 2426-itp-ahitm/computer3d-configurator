package at.ac.htl.features.cpuCooler;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CpuCoolerMapper {
    public CpuCoolerDto toResource(CpuCooler cpuCooler) {
        return new CpuCoolerDto(
                cpuCooler.cpu_cooler_id,
                cpuCooler.name,
                cpuCooler.price,
                cpuCooler.min_rpm,
                cpuCooler.max_rpm,
                cpuCooler.min_noise_level,
                cpuCooler.max_noise_level,
                cpuCooler.color,
                cpuCooler.size,
                cpuCooler.img
        );
    }
}
