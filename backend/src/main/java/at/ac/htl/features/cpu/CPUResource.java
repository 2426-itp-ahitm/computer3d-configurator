package at.ac.htl.features.cpu;

import java.util.List;

import at.ac.htl.features.motherboard.MotherboardDto;
import at.ac.htl.features.motherboard.MotherboardRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/cpus")
@Produces(MediaType.APPLICATION_JSON)
public class CPUResource {
    @Inject CPURepository cpuRepository;
    @Inject CPUMapper cpuMapper;
    @Inject MotherboardRepository motherboardRepository;

    @GET
    public List<CPUDto> allCPUs() {
        var cpus = cpuRepository.findAll()
            .stream()
            .map(cpuMapper::toResource)
            .toList();
        return cpus;
    }

    @GET
    @Path("/by-motherboard/{motherboardId}")
    public List<CPUDto> getCPUsByMotherboard(@PathParam("motherboardId") Long motherboardId) {
        var motherboard = motherboardRepository.findById(motherboardId);
        if (motherboard == null) {
            throw new WebApplicationException("Motherboard not found", 404);
        }

        var cpus = cpuRepository.findBySocket(motherboard.getSocket());

        return cpus.stream()
                .map(cpuMapper::toResource)
                .toList();
    }


    @GET
    @Path("/by-motherboard-socket/{motherboardSocket}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<CPUDto> getMotherboardsByCpuSocket(@PathParam("motherboardSocket") String motherboardSocket) {
        var cpus = cpuRepository.findBySocket(motherboardSocket);

        return cpus.stream()
            .map(cpuMapper::toResource)
            .toList();
    }


    @GET
    @Path("/{cpuId}")
    public CPU getCpuById(@PathParam("cpuId") Long cpuId) {
        var cpu = cpuRepository.findById(cpuId);
        return cpu;

    }
}
