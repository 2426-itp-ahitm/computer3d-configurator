package at.ac.htl.features.motherboard;

import java.util.List;

import at.ac.htl.features.ram.RAM;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MotherboardRepository implements PanacheRepository<Motherboard> {

    public List<Motherboard> findBySocket(String socket) {
        return list("socket", socket); // filter by sockets
    }
    public List<Motherboard> findByRam(String ramType)   {
        return list("ramType", ramType); // filter by sockets
    }


}
