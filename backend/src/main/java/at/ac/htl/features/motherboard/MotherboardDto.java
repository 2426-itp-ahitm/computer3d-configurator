package at.ac.htl.features.motherboard;

public record MotherboardDto(
    Long motherboard_id,
    String name,
    Float price,
    String socket,
    String ramType,
    String form_factor,
    Long max_memory,
    Long memory_slots,
    String color,
    String img,
    String model
) {

} 