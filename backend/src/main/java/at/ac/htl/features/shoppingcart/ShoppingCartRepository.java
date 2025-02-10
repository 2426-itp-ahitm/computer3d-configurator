package at.ac.htl.features.shoppingcart;

import at.ac.htl.features.shoppingcart.ShoppingCart;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ShoppingCartRepository implements PanacheRepository<ShoppingCart> {
    
}
