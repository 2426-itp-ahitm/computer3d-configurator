package at.ac.htl.features.powersupply;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PowersupplyRepository implements PanacheRepository<Powersupply> {
}
