package at.ac.htl.features.ram;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RAMMapper {
    public RAMDto toResource(RAM ram) {
        return new RAMDto(
                ram.ram_id,
                ram.name,
                ram.price,
                ram.type,
                ram.clock_speed,
                ram.module_count,
                ram.gb_per_module,
                ram.price_per_gb,
                ram.color,
                ram.first_word_latency,
                ram.cas_latency,
                ram.img,
                ram.model
        );
    }
}
