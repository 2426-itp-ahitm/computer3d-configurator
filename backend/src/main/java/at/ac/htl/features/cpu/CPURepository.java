package at.ac.htl.features.cpu;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class CPURepository implements PanacheRepository<CPU> {

    public List<CPU> findBySocket(String socket) {
        return list("socket", socket);
    }
}
