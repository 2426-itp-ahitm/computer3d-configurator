package at.ac.htl.features.internalHarddrive;

import at.ac.htl.features.shoppingcart.ShoppingCart;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Internal_Harddrive")
public class InternalHarddrive {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long internalHarddrive_id;
    String name;
    Float price;
    Long capacity;
    Float pricePerGb;
    String type;
    Long cache;
    String formFactor;
    String memoryInterface;
    String image;
    String model;

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @OneToMany(mappedBy = "internalHarddrive")
    private List<ShoppingCart> shoppingCarts;

    public List<ShoppingCart> getShoppingCarts() {
        return shoppingCarts;
    }

    public void setShoppingCarts(List<ShoppingCart> shoppingCarts) {
        this.shoppingCarts = shoppingCarts;
    }

    public Long getInternalHarddrive_id() {
        return internalHarddrive_id;
    }

    public void setInternalHarddrive_id(Long internalHarddrive_id) {
        this.internalHarddrive_id = internalHarddrive_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public Float getPricePerGb() {
        return pricePerGb;
    }

    public void setPricePerGb(Float pricePerGb) {
        this.pricePerGb = pricePerGb;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getCache() {
        return cache;
    }

    public void setCache(Long cache) {
        this.cache = cache;
    }

    public String getFormFactor() {
        return formFactor;
    }

    public void setFormFactor(String formFactor) {
        this.formFactor = formFactor;
    }

    public String getMemoryInterface() {
        return memoryInterface;
    }

    public void setMemoryInterface(String memoryInterface) {
        this.memoryInterface = memoryInterface;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
