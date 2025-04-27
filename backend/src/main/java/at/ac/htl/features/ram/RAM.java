package at.ac.htl.features.ram;

import at.ac.htl.features.shoppingcart.ShoppingCart;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class RAM {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long ram_id;
    String name;
    Float price;
    String type;
    Long clock_speed;
    Long module_count;
    Long gb_per_module;
    Float price_per_gb;
    String color;
    Long first_word_latency;
    Long cas_latency;
    String img;

    @OneToMany(mappedBy = "ram")
    private List<ShoppingCart> shoppingCarts;

    public List<ShoppingCart> getShoppingCarts() {
        return shoppingCarts;
    }

    public void setShoppingCarts(List<ShoppingCart> shoppingCarts) {
        this.shoppingCarts = shoppingCarts;
    }

    public Long getRam_id() {
        return ram_id;
    }

    public void setRam_id(Long ram_id) {
        this.ram_id = ram_id;
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

    public Long getClock_speed() {
        return clock_speed;
    }

    public void setClock_speed(Long clock_speed) {
        this.clock_speed = clock_speed;
    }

    public Long getModule_count() {
        return module_count;
    }

    public void setModule_count(Long module_count) {
        this.module_count = module_count;
    }

    public Long getGb_per_module() {
        return gb_per_module;
    }

    public void setGb_per_module(Long gb_per_module) {
        this.gb_per_module = gb_per_module;
    }

    public Float getPrice_per_gb() {
        return price_per_gb;
    }

    public void setPrice_per_gb(Float price_per_gb) {
        this.price_per_gb = price_per_gb;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getFirst_word_latency() {
        return first_word_latency;
    }

    public void setFirst_word_latency(Long first_word_latency) {
        this.first_word_latency = first_word_latency;
    }

    public Long getCas_latency() {
        return cas_latency;
    }

    public void setCas_latency(Long cas_latency) {
        this.cas_latency = cas_latency;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
