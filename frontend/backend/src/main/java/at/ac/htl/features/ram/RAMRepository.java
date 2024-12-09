package at.ac.htl.features.ram;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RAMRepository implements PanacheRepository<RAM> {

}