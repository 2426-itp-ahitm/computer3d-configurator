package at.ac.htl.features.internalHarddrive;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class InternalHarddriveRepository implements PanacheRepository<InternalHarddrive> {
}
