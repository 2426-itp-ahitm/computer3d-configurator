package at.ac.htl.features.casing;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CaseMapper {
    public CaseDto toResource(Case caseing) {
        return new CaseDto(
                caseing.case_id,
                caseing.name,
                caseing.price,
                caseing.type,
                caseing.color,
                caseing.psu,
                caseing.side_panel,
                caseing.external_volume,
                caseing.internal_35_bays,
                caseing.img
        );
    }
}
