package at.ac.htl.features.cpuCooler;

import at.ac.htl.features.shoppingcart.ShoppingCart;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "cpu_cooler")
public class CpuCooler {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long cpu_cooler_id;
    String name;
    Float price;
    Long min_rpm;
    Long max_rpm;
    Float min_noise_level;
    Float max_noise_level;
    String color;
    Long size;
    String img;

    @OneToMany(mappedBy = "cpuCooler")
    private List<ShoppingCart> shoppingCarts;

    public List<ShoppingCart> getShoppingCarts() {
        return shoppingCarts;
    }

    public void setShoppingCarts(List<ShoppingCart> shoppingCarts) {
        this.shoppingCarts = shoppingCarts;
    }

    public Long getCpu_cooler_id() {
        return cpu_cooler_id;
    }

    public void setCpu_cooler_id(Long cpuCoolerId) {
        this.cpu_cooler_id = cpuCoolerId;
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

    public Long getMin_rpm() {
        return min_rpm;
    }

    public void setMin_rpm(Long minRpm) {
        this.min_rpm = minRpm;
    }

    public Long getMax_rpm() {
        return max_rpm;
    }

    public void setMax_rpm(Long maxRpm) {
        this.max_rpm = maxRpm;
    }

    public Float getMin_noise_level() {
        return min_noise_level;
    }

    public void setMin_noise_level(Float minNoiseLevel) {
        this.min_noise_level = minNoiseLevel;
    }

    public Float getMax_noise_level() {
        return max_noise_level;
    }

    public void setMax_noise_level(Float maxNoiseLevel) {
        this.max_noise_level = maxNoiseLevel;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
