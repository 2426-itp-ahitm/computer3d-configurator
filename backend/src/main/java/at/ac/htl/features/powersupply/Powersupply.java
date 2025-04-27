package at.ac.htl.features.powersupply;

import at.ac.htl.features.shoppingcart.ShoppingCart;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Powersupply {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long powersupply_id;
    String name;
    Float price;
    String type;
    String efficiency;
    Long wattage;
    String modular;
    String color;
    String img;

    @OneToMany(mappedBy = "powersupply")
    private List<ShoppingCart> shoppingCarts;

    public List<ShoppingCart> getShoppingCarts() {
        return shoppingCarts;
    }

    public void setShoppingCarts(List<ShoppingCart> shoppingCarts) {
        this.shoppingCarts = shoppingCarts;
    }

    public Long getPowersupply_id() {
        return powersupply_id;
    }

    public void setPowersupply_id(Long powersupply_id) {
        this.powersupply_id = powersupply_id;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEfficiency() {
        return efficiency;
    }

    public void setEfficiency(String efficiency) {
        this.efficiency = efficiency;
    }

    public Long getWattage() {
        return wattage;
    }

    public void setWattage(Long wattage) {
        this.wattage = wattage;
    }

    public String getModular() {
        return modular;
    }

    public void setModular(String modular) {
        this.modular = modular;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
