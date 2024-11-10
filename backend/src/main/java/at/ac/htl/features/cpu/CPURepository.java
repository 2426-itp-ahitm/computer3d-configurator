package at.ac.htl.features.cpu;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CPURepository implements PanacheRepository<CPU> {
}
