package at.ac.htl.features.shoppingcart;

import at.ac.htl.features.cpu.CPU;
import at.ac.htl.features.cpu.CPURepository;
import at.ac.htl.features.gpu.GPU;
import at.ac.htl.features.gpu.GPURepository;
import at.ac.htl.features.motherboard.Motherboard;
import at.ac.htl.features.motherboard.MotherboardRepository;
import at.ac.htl.features.ram.RAM;
import at.ac.htl.features.ram.RAMRepository;
import at.ac.htl.features.shoppingcart.ShoppingCartDto;
import at.ac.htl.features.shoppingcart.ShoppingCart;
import at.ac.htl.features.shoppingcart.ShoppingCartMapper;
import at.ac.htl.features.shoppingcart.ShoppingCartRepository;
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
            default:
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Invalid component type").build();
        }

        double totalPrice = 0.0;
        if (cart.getCpu() != null) totalPrice += cart.getCpu().getPrice();
        if (cart.getMotherboard() != null) totalPrice += cart.getMotherboard().getPrice();
        if (cart.getGpu() != null) totalPrice += cart.getGpu().getPrice();
        if (cart.getRam() != null) totalPrice += cart.getRam().getPrice();
        cart.setTotalPrice(totalPrice);

        cartRepository.persist(cart);
        return Response.ok(cartMapper.toDto(cart)).build();
    }

}
