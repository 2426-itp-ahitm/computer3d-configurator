package at.ac.htl.features.ram;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;


@Path("/rams")
@Produces(MediaType.APPLICATION_JSON)
public class RAMResource {
    @Inject RAMRepository ramRepository;
    @Inject RAMMapper ramMapper;

    @GET
    public List<RAMDto> allRAM(){
        var rams = ramRepository.findAll()
                .stream()
                .map(ramMapper::toResource)
                .toList();
        return rams;
    }

    @GET
    @Path("/by-Motherboard-Type/{ramTypeMotherboard}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<RAMDto> getMotherboardsByRamType(@PathParam("ramTypeMotherboard") String ramType) {
        var rams = ramRepository.findBySocket(ramType);

        return rams.stream()
                .map(ramMapper::toResource)
                .toList();
    }

}
