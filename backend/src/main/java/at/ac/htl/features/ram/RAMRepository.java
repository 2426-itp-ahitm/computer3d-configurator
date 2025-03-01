package at.ac.htl.features.ram;

import at.ac.htl.features.motherboard.Motherboard;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class RAMRepository implements PanacheRepository<RAM> {
    public List<RAM> findBySocket(String type) {
        return list("type", type); // filter by type
    }

}