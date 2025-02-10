package at.ac.htl.features.shoppingcart;

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

    @Inject
    ShoppingCartRepository cartRepository;

    @Inject
    ShoppingCartMapper cartMapper;

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
    @Path("/update-cart/{id}")
    @Transactional
    public Response updateCart(@PathParam("id") Long id, ShoppingCart updatedCart) {
        ShoppingCart existingCart = cartRepository.findById(id);
        if (existingCart == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        existingCart.setCpu(updatedCart.getCpu());
        existingCart.setMotherboard(updatedCart.getMotherboard());
        existingCart.setGpu(updatedCart.getGpu());
        existingCart.setRam(updatedCart.getRam());
        existingCart.setTotalPrice(updatedCart.getTotalPrice());
        cartRepository.persist(existingCart);
        return Response.ok(cartMapper.toDto(existingCart)).build();
    }
}
