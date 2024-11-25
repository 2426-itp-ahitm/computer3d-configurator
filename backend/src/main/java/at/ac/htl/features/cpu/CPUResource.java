package at.ac.htl.features.cpu;

import java.util.List;

import at.ac.htl.features.motherboard.MotherboardRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/cpus")
@Produces(MediaType.APPLICATION_JSON)
public class CPUResource {
    @Inject CPURepository CPURepository;
    @Inject CPUMapper CPUMapper;
    @Inject MotherboardRepository MotherboardRepository;

    @GET
    public List<CPUDto> allCPUs() {
        var cpus = CPURepository.findAll()
            .stream()
            .map(CPUMapper::toResource)
            .toList();
        return cpus;
    }

    @GET
    @Path("/by-motherboard/{motherboardId}")
    public List<CPUDto> getCPUsByMotherboard(@PathParam("motherboardId") Long motherboardId) {
        var motherboard = MotherboardRepository.findById(motherboardId);
        if (motherboard == null) {
            throw new WebApplicationException("Motherboard not found", 404);
        }

        var cpus = CPURepository.findBySocket(motherboard.getSocket());

        return cpus.stream()
                .map(CPUMapper::toResource)
                .toList();
    }

}
