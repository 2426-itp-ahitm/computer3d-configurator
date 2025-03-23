package at.ac.htl.features.cpuCooler;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

import java.util.List;

@Path("/cpu-cooler")
public class CpuCoolerResource {
    @Inject CpuCoolerRepository cpuCoolerRepository;
    @Inject CpuCoolerMapper cpuCoolerMapper;

    @GET
    public List<CpuCoolerDto> getCpuCoolers() {
        var cpuCoolers = cpuCoolerRepository.findAll()
                .stream()
                .map(cpuCoolerMapper::toResource)
                .toList();
        return cpuCoolers;
    }
}
