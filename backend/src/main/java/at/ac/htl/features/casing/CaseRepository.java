package at.ac.htl.features.casing;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CaseRepository implements PanacheRepository<Case> {

}
