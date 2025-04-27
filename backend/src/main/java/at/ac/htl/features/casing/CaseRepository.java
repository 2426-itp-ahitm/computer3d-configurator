package at.ac.htl.features.casing;

import at.ac.htl.features.motherboard.Motherboard;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class CaseRepository implements PanacheRepository<Case> {

    public List<Case> findByType(String type) {
        return list("type", type); // filter by sockets
    }
}
