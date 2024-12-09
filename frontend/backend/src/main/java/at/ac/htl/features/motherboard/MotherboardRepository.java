package at.ac.htl.features.motherboard;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MotherboardRepository implements PanacheRepository<Motherboard> {

    public List<Motherboard> findBySocket(String socket) {
        return list("socket", socket); // filter by sockets
    }

}
