package at.ac.htl.features.powersupply;

public record PowersupplyDto(Long powersupply_id,
                             String name,
                             Float price,
                             String type,
                             String efficiency,
                             Long wattage,
                             String modular,
                             String color,
                             String img) {

}
