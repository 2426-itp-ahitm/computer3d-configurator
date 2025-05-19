package at.ac.htl.features.internalHarddrive;

public record InternalHarddriveDto(
        Long internalHarddrive_id,
        String name,
        Float price,
        Long capacity,
        Float pricePerGb,
        String type,
        Long cache,
        String formFactor,
        String memoryInterface,
        String image,
        String model
) {
}
