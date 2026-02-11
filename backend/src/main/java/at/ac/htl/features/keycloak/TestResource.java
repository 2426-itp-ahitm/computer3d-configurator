package at.ac.htl.features.keycloak;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/test")
public class TestResource {

    @GET
    //@RolesAllowed("user")
    public String secured() {
        return "Access granted";
    }
}
