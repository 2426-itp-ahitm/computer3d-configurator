package at.ac.htl.features.motherboard;

import java.util.List;

import at.ac.htl.features.cpu.CPURepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/motherboards")
@Produces(MediaType.APPLICATION_JSON)
public class MotherboardResource {
    @Inject MotherboardRepository MotherboardRepository;
    @Inject MotherboardMapper MotherboardMapper;
    @Inject CPURepository CPURepository;

    @GET
    public List<MotherboardDto> allMotherboards() {
        var motherboards = MotherboardRepository.findAll()
        .stream()
        .map(MotherboardMapper::toResource)
        .toList();
        return motherboards;
    }

    @GET
    @Path("/by-cpu/{cpuId}")
    public List<MotherboardDto> getMotherboardsByCPU(@PathParam("cpuId") Long cpuId) {
    var cpu = CPURepository.findById(cpuId);
    if (cpu == null) {
        throw new WebApplicationException("CPU not found", 404);
    }

    var motherboards = MotherboardRepository.findBySocket(cpu.getSocket());

    return motherboards.stream()
            .map(MotherboardMapper::toResource)
            .toList();
    }

}
