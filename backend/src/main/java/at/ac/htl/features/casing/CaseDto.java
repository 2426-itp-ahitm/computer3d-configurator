package at.ac.htl.features.casing;

public record CaseDto(
        Long case_id,
        String name,
        Float price,
        String type,
        String color,
        Long psu,
        String side_panel,
        Float external_volume,
        Long internal_35_bays,
        String img,
        String model
) {
}
