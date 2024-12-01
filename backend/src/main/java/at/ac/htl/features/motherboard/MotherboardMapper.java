package at.ac.htl.features.motherboard;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MotherboardMapper {
    public MotherboardDto toResource(Motherboard motherboard) {
        return new MotherboardDto(
            motherboard.motherboard_id,
            motherboard.name,
            motherboard.price,
            motherboard.socket,
            motherboard.form_factor,
            motherboard.max_memory,
            motherboard.memory_slots,
            motherboard.color,
            motherboard.img
        );
    }
}
