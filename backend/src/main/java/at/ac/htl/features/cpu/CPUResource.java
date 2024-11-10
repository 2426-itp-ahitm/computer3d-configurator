package at.ac.htl.features.cpu;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/cpus")
@Produces(MediaType.APPLICATION_JSON)
public class CPUResource {
    @Inject
    CPURepository CPURepository;

    @GET
    public List<CPU> all() {
        var cpus = CPURepository.findAll().list();
        return cpus;
    }
}
