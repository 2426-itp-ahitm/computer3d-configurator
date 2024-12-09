package at.ac.htl.features.gpu;

import java.util.List;

import at.ac.htl.features.motherboard.Motherboard;
import at.ac.htl.features.motherboard.MotherboardRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;
@Path("/gpus")
@Produces(MediaType.APPLICATION_JSON)
public class GPUResource  {
    @Inject GPURepository gpuRepository;
    @Inject GPUMapper gpuMapper;

    @GET
    public List<GPUDto> allGPU(){
        var gpus = GPURepository.findAll()
                .stream()
                .map(GPUMapper::toResource)
                .toList();
        return  gpus;
    }

}
