package at.ac.htl.features.motherboard;

import java.util.List;

import at.ac.htl.features.cpu.CPURepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/motherboards")
@Produces(MediaType.APPLICATION_JSON)
public class MotherboardResource {
    @Inject MotherboardRepository motherboardRepository;
    @Inject MotherboardMapper motherboardMapper;
    @Inject CPURepository cpuRepository;

    @GET
    public List<MotherboardDto> allMotherboards() {
        var motherboards = motherboardRepository.findAll()
        .stream()
        .map(motherboardMapper::toResource)
        .toList();
        return motherboards;
    }

    @GET
    @Path("/by-cpu/{cpuId}")
    public List<MotherboardDto> getMotherboardsByCPU(@PathParam("cpuId") Long cpuId) {
    var cpu = cpuRepository.findById(cpuId);
    if (cpu == null) {
        throw new WebApplicationException("CPU not found", 404);
    }

    var motherboards = motherboardRepository.findBySocket(cpu.getSocket());

    return motherboards.stream()
            .map(motherboardMapper::toResource)
            .toList();
    }

    @GET
    @Path("/{motherboardId}")
    public Motherboard getMotherboardById(@PathParam("motherboardId") Long motherboardId) {
        var motherboard = motherboardRepository.findById(motherboardId);    
        return motherboard;
        
    }

}
