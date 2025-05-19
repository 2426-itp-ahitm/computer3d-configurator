package at.ac.htl.features.cpu;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CPUMapper {
    public CPUDto toResource(CPU cpu) {
        return new CPUDto(
                cpu.cpu_id,
                cpu.name,
                cpu.price,
                cpu.core_count,
                cpu.core_clock,
                cpu.boost_clock,
                cpu.tdp,
                cpu.graphics,
                cpu.smt,
                cpu.socket,
                cpu.img,
                cpu.model
        );
    }
}

