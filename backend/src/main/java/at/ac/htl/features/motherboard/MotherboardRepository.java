package at.ac.htl.features.motherboard;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MotherboardRepository implements PanacheRepository<motherboard> {
}
