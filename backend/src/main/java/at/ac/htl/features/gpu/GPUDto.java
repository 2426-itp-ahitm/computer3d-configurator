package at.ac.htl.features.gpu;

public record GPUDto(
        Long gpu_id,
        String name,
        Float price,
        String chipset,
        Long memory,
        Long core_clock,
        Long boost_clock,
        String color,
        Long length,
        String img,
        String model
) {

}
