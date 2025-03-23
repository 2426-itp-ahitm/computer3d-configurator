package at.ac.htl.features.cpuCooler;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CpuCoolerRepository implements PanacheRepository<CpuCooler> {

}
