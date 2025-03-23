package at.ac.htl.features.cpuCooler;

public record CpuCoolerDto(
        Long cpu_cooler_id,
        String name,
        Float price,
        Long min_rpm,
        Long max_rpm,
        Float min_noise_level,
        Float max_noise_level,
        String color,
        Long size,
        String img
) {
}
