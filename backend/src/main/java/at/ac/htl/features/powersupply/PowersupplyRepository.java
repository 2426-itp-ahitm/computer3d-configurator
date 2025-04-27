package at.ac.htl.features.powersupply;

import at.ac.htl.features.casing.Case;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class PowersupplyRepository implements PanacheRepository<Powersupply> {
    public List<Powersupply> findByType(String type) {
        return list("type", type); // filter by PowersupplyType ATX or smth
    }
}
