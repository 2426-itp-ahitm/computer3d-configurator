package at.ac.htl.features.internalHarddrive;

import at.ac.htl.features.gpu.GPUDto;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;


@Path("internal-Harddrive")
@Produces(MediaType.APPLICATION_JSON)
public class InternalHarddriveResource{
    @Inject InternalHarddriveMapper internalHarddriveMapper;
    @Inject InternalHarddriveRepository internalHarddriveRepository;

    @GET
    public List<InternalHarddriveDto> allInternelHarddrives(){
        var internalHarddrives = internalHarddriveRepository.findAll()
                .stream()
                .map(internalHarddriveMapper::toResource)
                .toList();
        return  internalHarddrives;
    }

}
