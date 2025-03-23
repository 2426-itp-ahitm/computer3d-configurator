package at.ac.htl.features.casing;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

import java.util.List;

@Path("/cases")
public class CaseResource {
    @Inject CaseMapper caseMapper;
    @Inject CaseRepository caseRepository;

    @GET
    public List<CaseDto> getCases() {
        var cases =  caseRepository.findAll()
                .stream()
                .map(caseMapper::toResource)
                .toList();
        return cases;
    }


}
