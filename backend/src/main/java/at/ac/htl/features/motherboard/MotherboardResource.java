package at.ac.htl.features.motherboard;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/motherboards")
@Produces(MediaType.APPLICATION_JSON)
public class MotherboardResource {
    @Inject
    MotherboardRepository MotherboardRepository;

    @GET
    public List<motherboard> all() {
        var motherboards = MotherboardRepository.findAll().list();
        return motherboards;
    }
}
