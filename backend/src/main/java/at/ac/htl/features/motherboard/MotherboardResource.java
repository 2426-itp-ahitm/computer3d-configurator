package at.ac.htl.features.motherboard;

import java.util.ArrayList;
import java.util.List;

import at.ac.htl.features.cpu.CPURepository;
import at.ac.htl.features.ram.RAMDto;
import at.ac.htl.features.ram.RAMMapper;
import at.ac.htl.features.ram.RAMRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/motherboards")
@Produces(MediaType.APPLICATION_JSON)
public class MotherboardResource {

    @Inject MotherboardRepository motherboardRepository;
    @Inject MotherboardMapper motherboardMapper;
    @Inject RAMMapper ramMapper;
    @Inject CPURepository cpuRepository;
    @Inject RAMRepository ramRepository;

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

    @GET
    @Path("/by-cpu-socket/{cpuSocket}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<MotherboardDto> getMotherboardsByCpuSocket(@PathParam("cpuSocket") String cpuSocket) {
        var motherboards = motherboardRepository.findBySocket(cpuSocket);

        return motherboards.stream()
                .map(motherboardMapper::toResource)
                .toList();
    }

    @GET
    @Path("/by-RAM-Type/{ramType}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<MotherboardDto> getMotherboardsByRamTypeOnMotherboard(@PathParam("ramType") String ramType) {
        var motherBoards = motherboardRepository.findByRam(ramType);

        return motherBoards.stream()
                .map(motherboardMapper::toResource)
                .toList();
    }

    @GET
    @Path("/by-RAM-Type-And-CPU-Socket/{ramType}/{cpuSocket}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<MotherboardDto> getMotherboardsByCpuSocketAndRamType(@PathParam("ramType") String ramType, @PathParam("cpuSocket") String cpuSocket) {
        var motherBoardsByRamType = motherboardRepository.findByRam(ramType);
        var motherBoardsByCPUSocket = motherboardRepository.findBySocket(cpuSocket);
        motherBoardsByRamType.retainAll(motherBoardsByCPUSocket);

        return motherBoardsByRamType.stream()
                .map(motherboardMapper::toResource)
                .toList();
    }

    @GET
    @Path("/by-RAM-Type-CPU-Socket-Case-Type/{ramType}/{cpuSocket}/{caseType}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<MotherboardDto> getMotherboardsByCpuSocketAndRamTypeAndCaseType(@PathParam("ramType") String ramType, @PathParam("cpuSocket") String cpuSocket, @PathParam("caseType") String caseType) {

        var motherBoardsByRamType = motherboardRepository.findByRam(ramType);
        var motherBoardsByCPUSocket = motherboardRepository.findBySocket(cpuSocket);
        var motherBoardByCaseFactor = motherboardRepository.findBySize(caseType);

        var result = new ArrayList<>(motherBoardsByRamType);
        result.retainAll(motherBoardsByCPUSocket);
        result.retainAll(motherBoardByCaseFactor);


        return result.stream()
                .map(motherboardMapper::toResource)
                .toList();
    }

    @GET
    @Path("/by-CPU-Socket-Case-Type/{cpuSocket}/{caseType}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<MotherboardDto> getMotherboardsByCpuSocketAndCaseType( @PathParam("cpuSocket") String cpuSocket, @PathParam("caseType") String caseType) {

        var motherBoardsByCPUSocket = motherboardRepository.findBySocket(cpuSocket);
        var motherBoardByCaseFactor = motherboardRepository.findBySize(caseType);

        var result = new ArrayList<>(motherBoardsByCPUSocket);
        result.retainAll(motherBoardByCaseFactor);


        return result.stream()
                .map(motherboardMapper::toResource)
                .toList();
    }

    @GET
    @Path("/by-RAM-Type-Case-Type/{ramType}/{caseType}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<MotherboardDto> getMotherboardsByRamTypeAndCaseType(@PathParam("ramType") String ramType, @PathParam("caseType") String caseType) {

        var motherBoardsByRamType = motherboardRepository.findByRam(ramType);
        var motherBoardByCaseFactor = motherboardRepository.findBySize(caseType);

        var result = new ArrayList<>(motherBoardsByRamType);
        result.retainAll(motherBoardByCaseFactor);


        return result.stream()
                .map(motherboardMapper::toResource)
                .toList();
    }






}
