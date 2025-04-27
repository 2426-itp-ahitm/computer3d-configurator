package at.ac.htl.features.powersupply;

import at.ac.htl.features.casing.CaseDto;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/powersupply")
@Produces(MediaType.APPLICATION_JSON)
public class PowersupplyRessource {
    @Inject PowersupplyMapper powersupplyMapper;
    @Inject PowersupplyRepository powersupplyRepository;

    @GET
    public List<PowersupplyDto> getALlPowersupplies(){
        var powersupplys = powersupplyRepository.findAll()
                .stream()
                .map(powersupplyMapper::toResource)
                .toList();
        return powersupplys;
    }



    @GET
    @Path("/by-CaseType/{CaseType}/")
    public List<PowersupplyDto> getCasesByCaseType(@PathParam("CaseType") String caseType) {
        var cases = powersupplyRepository.findByType(caseType);

        return cases.stream()
                .map(powersupplyMapper::toResource)
                .toList();
    }
}
