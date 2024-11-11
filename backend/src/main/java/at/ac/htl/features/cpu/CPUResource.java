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
    @Inject CPURepository CPURepository;
    @Inject CPUMapper CPUMapper;

    @GET
    public List<CPUDto> allCPUs() {
        var cpus = CPURepository.findAll()
            .stream()
            .map(CPUMapper::toResource)
            .toList();
        return cpus;
    }

}
