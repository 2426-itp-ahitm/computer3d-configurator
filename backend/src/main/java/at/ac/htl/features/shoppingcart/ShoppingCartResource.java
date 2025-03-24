package at.ac.htl.features.shoppingcart;

import at.ac.htl.features.casing.Case;
import at.ac.htl.features.casing.CaseRepository;
import at.ac.htl.features.cpu.CPU;
import at.ac.htl.features.cpu.CPURepository;
import at.ac.htl.features.cpuCooler.CpuCooler;
import at.ac.htl.features.cpuCooler.CpuCoolerRepository;
import at.ac.htl.features.gpu.GPU;
import at.ac.htl.features.gpu.GPURepository;
import at.ac.htl.features.internalHarddrive.InternalHarddrive;
import at.ac.htl.features.internalHarddrive.InternalHarddriveRepository;
import at.ac.htl.features.motherboard.Motherboard;
import at.ac.htl.features.motherboard.MotherboardRepository;
import at.ac.htl.features.powersupply.Powersupply;
import at.ac.htl.features.powersupply.PowersupplyRepository;
import at.ac.htl.features.ram.RAM;
import at.ac.htl.features.ram.RAMRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/shoppingcart")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ShoppingCartResource {

    @Inject ShoppingCartRepository cartRepository;
    @Inject CPURepository cpuRepository;
    @Inject MotherboardRepository motherboardRepository;
    @Inject RAMRepository ramRepository;
    @Inject GPURepository gpuRepository;

    @Inject
    ShoppingCartMapper cartMapper;
    @Inject
    ShoppingCartRepository shoppingCartRepository;
    @Inject
    ShoppingCartMapper shoppingCartMapper;
    @Inject
    PowersupplyRepository powersupplyRepository;
    @Inject
    InternalHarddriveRepository internalHarddriveRepository;
    @Inject
    CpuCoolerRepository cpuCoolerRepository;
    @Inject
    CaseRepository caseRepository;

    /**
     * Mainpage hat ein input feld mit der Warenkorb id
     * und eine Option zu sagen "I dont have a shoppingcart currently" -> erstellt einen
     * neuen Shoppingcart
     * jedes mal wenn ein Component hinzugefügt wird soll geupdated werden
     * 
     */

    /**
     * Erzeugt einen neuen Warenkorb.
     */
    @POST
    @Path("/createShoppingCart")
    @Transactional
    public Response createCart(ShoppingCart cart) {
        // Optional: Berechnet hier den Gesamtpreis anhand der einzelnen Komponenten, falls gewünscht.
        cartRepository.persist(cart);
        return Response.status(Response.Status.CREATED).entity(cartMapper.toDto(cart)).build();
    }
    
    @GET
    @Path("/get-by-id/{id}")
    public Response getCart(@PathParam("id") Long id) {
        ShoppingCart cart = cartRepository.findById(id);
        if (cart == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(cartMapper.toDto(cart)).build();
    }

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCarts() {
        var shoppingCarts = shoppingCartRepository.findAll()
                .stream()
                .map(shoppingCartMapper::toDto) // Verwende toDto statt toRessource
                .toList();
        return Response.ok(shoppingCarts).build(); // ✅ Richtige Rückgabe
    }


    /**
     * Aktualisiert einen vorhandenen Warenkorb.
     */
    @PUT
    @Path("/update-cart/{shoppingCartId}/{component}/{idComponent}")
    @Transactional
    public Response updateCart(
            @PathParam("shoppingCartId") Long cartId,
            @PathParam("component") String component,
            @PathParam("idComponent") Long componentId) {

        ShoppingCart cart = cartRepository.findById(cartId);
        if (cart == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        switch (component.toLowerCase()) {
            case "cpu":
                CPU cpu = cpuRepository.findById(componentId);
                if (cpu == null) return Response.status(Response.Status.NOT_FOUND).build();
                cart.setCpu(cpu);
                break;
            case "motherboard":
                Motherboard motherboard = motherboardRepository.findById(componentId);
                if (motherboard == null) return Response.status(Response.Status.NOT_FOUND).build();
                cart.setMotherboard(motherboard);
                break;
            case "gpu":
                GPU gpu = gpuRepository.findById(componentId);
                if (gpu == null) return Response.status(Response.Status.NOT_FOUND).build();
                cart.setGpu(gpu);
                break;
            case "ram":
                RAM ram = ramRepository.findById(componentId);
                if (ram == null) return Response.status(Response.Status.NOT_FOUND).build();
                cart.setRam(ram);
                break;
            case "psu":
                Powersupply psu = powersupplyRepository.findById(componentId);
                if (psu == null) return Response.status(Response.Status.NOT_FOUND).build();
                cart.setPowersupply(psu);
                break;
            case "internalharddrive":
                InternalHarddrive internalHarddrive = internalHarddriveRepository.findById(componentId);
                if (internalHarddrive == null) return Response.status(Response.Status.NOT_FOUND).build();
                cart.setInternalHarddrive(internalHarddrive);
                break;
            case "cpucooler":
                CpuCooler cpuCooler = cpuCoolerRepository.findById(componentId);
                if (cpuCooler == null) return Response.status(Response.Status.NOT_FOUND).build();
                cart.setCpuCooler(cpuCooler);
                break;
            case "case":
                Case casing = caseRepository.findById(componentId);
                if (casing == null) return Response.status(Response.Status.NOT_FOUND).build();
                cart.setComputerCase(casing);
                break;
            default:
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Invalid component type").build();
        }

        double totalPrice = 0.0;
        if (cart.getCpu() != null) totalPrice += cart.getCpu().getPrice();
        if (cart.getMotherboard() != null) totalPrice += cart.getMotherboard().getPrice();
        if (cart.getGpu() != null) totalPrice += cart.getGpu().getPrice();
        if (cart.getRam() != null) totalPrice += cart.getRam().getPrice();
        if (cart.getPowersupply() != null) totalPrice += cart.getPowersupply().getPrice();
        if (cart.getInternalHarddrive() != null) totalPrice += cart.getInternalHarddrive().getPrice();
        if (cart.getCpuCooler() != null) totalPrice += cart.getCpuCooler().getPrice();
        if (cart.getComputerCase() != null) totalPrice += cart.getComputerCase().getPrice();
        cart.setTotalPrice(totalPrice);

        cartRepository.persist(cart);
        return Response.ok(cartMapper.toDto(cart)).build();
    }

    /**
     * Entfernt eine bestimmte Komponente aus dem Warenkorb.
     */
    @DELETE
    @Path("/remove-component/{shoppingCartId}/{component}")
    @Transactional
    public Response removeComponent(
            @PathParam("shoppingCartId") Long cartId,
            @PathParam("component") String component) {

        ShoppingCart cart = cartRepository.findById(cartId);
        if (cart == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        switch (component.toLowerCase()) {
            case "cpu":
                cart.setCpu(null);
                break;
            case "motherboard":
                cart.setMotherboard(null);
                break;
            case "gpu":
                cart.setGpu(null);
                break;
            case "ram":
                cart.setRam(null);
                break;
            case "psu":
                cart.setPowersupply(null);
                break;
            case "internalharddrive":
                cart.setInternalHarddrive(null);
                break;
            case "cpucooler":
                cart.setCpuCooler(null);
                break;
            case "case":
                cart.setComputerCase(null);
                break;
            default:
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Invalid component type").build();
        }

        // Gesamtpreis neu berechnen
        double totalPrice = 0.0;
        if (cart.getCpu() != null) totalPrice += cart.getCpu().getPrice();
        if (cart.getMotherboard() != null) totalPrice += cart.getMotherboard().getPrice();
        if (cart.getGpu() != null) totalPrice += cart.getGpu().getPrice();
        if (cart.getRam() != null) totalPrice += cart.getRam().getPrice();
        if(cart.getPowersupply() != null) totalPrice += cart.getPowersupply().getPrice();
        if(cart.getInternalHarddrive() != null) totalPrice += cart.getInternalHarddrive().getPrice();
        if (cart.getCpuCooler() != null) totalPrice += cart.getCpuCooler().getPrice();
        if (cart.getComputerCase() != null) totalPrice += cart.getComputerCase().getPrice();
        cart.setTotalPrice(totalPrice);

        cartRepository.persist(cart);
        return Response.ok(cartMapper.toDto(cart)).build();
    }


}
