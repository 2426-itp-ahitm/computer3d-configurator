package at.ac.htl.features.cpu;

public record CPUDto(
    Long cpu_id,
    String name,
    Float price,
    Long core_count,
    Float core_clock,
    Float boost_clock,
    Long tdp,
    String graphics,
    Boolean smt,
    String socket,
    String img
) {
    
}
