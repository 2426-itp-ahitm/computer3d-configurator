package at.ac.htl.features.powersupply;

import at.ac.htl.features.gpu.GPU;
import at.ac.htl.features.gpu.GPUDto;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PowersupplyMapper {
    public PowersupplyDto toResource(Powersupply psu){
        return new PowersupplyDto(
                psu.powersupply_id,
                psu.name,
                psu.price,
                psu.type,
                psu.efficiency,
                psu.wattage,
                psu.modular,
                psu.color,
                psu.img
        );
    }
}
