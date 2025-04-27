package at.ac.htl.features.motherboard;

import at.ac.htl.features.shoppingcart.ShoppingCart;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Motherboard {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long motherboard_id;
    String name;
    Float price;
    String socket;
    String ramType;
    String form_factor;
    Long max_memory;
    Long memory_slots;
    String color;
    String img;

    @OneToMany(mappedBy = "motherboard")
    private List<ShoppingCart> shoppingCarts;

    public List<ShoppingCart> getShoppingCarts() {
        return shoppingCarts;
    }

    public void setShoppingCarts(List<ShoppingCart> shoppingCarts) {
        this.shoppingCarts = shoppingCarts;
    }

    public String getRamType() {
        return ramType;
    }

    public void setRamType(String ramType) {
        this.ramType = ramType;
    }

    public Long getMotherboard_id() {
        return motherboard_id;
    }

    public void setMotherboard_id(Long motherboard_id) {
        this.motherboard_id = motherboard_id;
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

    public String getSocket() {
        return socket;
    }

    public void setSocket(String socket) {
        this.socket = socket;
    }

    public String getForm_factor() {
        return form_factor;
    }

    public void setForm_factor(String form_factor) {
        this.form_factor = form_factor;
    }

    public Long getMax_memory() {
        return max_memory;
    }

    public void setMax_memory(Long max_memory) {
        this.max_memory = max_memory;
    }

    public Long getMemory_slots() {
        return memory_slots;
    }

    public void setMemory_slots(Long memory_slots) {
        this.memory_slots = memory_slots;
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
