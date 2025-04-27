package at.ac.htl.features.casing;

import at.ac.htl.features.cpu.CPUDto;
import at.ac.htl.features.motherboard.MotherboardDto;
import at.ac.htl.features.motherboard.MotherboardMapper;
import at.ac.htl.features.motherboard.MotherboardRepository;
import at.ac.htl.features.powersupply.PowersupplyRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/cases")
public class CaseResource {
    @Inject CaseMapper caseMapper;
    @Inject CaseRepository caseRepository;
    @Inject MotherboardRepository motherboardRepository;
    @Inject PowersupplyRepository powersupplyRepository;

    @GET
    public List<CaseDto> getCases() {
        var cases =  caseRepository.findAll()
                .stream()
                .map(caseMapper::toResource)
                .toList();
        return cases;
    }

    @GET
    @Path("/by-CaseType/{CaseType}/")
    public List<CaseDto> getCasesByCaseType(@PathParam("CaseType") String caseType) {
        var cases = caseRepository.findByType(caseType);

        return cases.stream()
                .map(caseMapper::toResource)
                .toList();
    }


//    @GET
//    @Path("/by-Motherboard-by-PSU/{motherBoardType}/{psuType}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<MotherboardDto> getMotherboardsByCpuSocketAndRamType(@PathParam("motherBoardType") String motherBoardType, @PathParam("psuType") String psuType) {
//        var casesByMotherboards = motherboardRepository.findByRam(ramType);
//        var casesByPowersupplies = motherboardRepository.findBySocket(cpuSocket);
//        casesByMotherboards.retainAll(casesByPowersupplies);
//
//        return casesByMotherboards.stream()
//                .map(caseMapper::toResource)
//                .toList();
//
//    }


}
