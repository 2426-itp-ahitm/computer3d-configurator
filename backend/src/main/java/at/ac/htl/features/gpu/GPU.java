package at.ac.htl.features.gpu;

import at.ac.htl.features.shoppingcart.ShoppingCart;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class GPU {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long gpu_id;
    String name;
    Float price;
    String chipset;
    Long memory;
    Long core_clock;
    Long boost_clock;
    String color;
    Long length;
    String img;

    @OneToMany(mappedBy = "gpu")
    private List<ShoppingCart> shoppingCarts;

    public List<ShoppingCart> getShoppingCarts() {
        return shoppingCarts;
    }

    public void setShoppingCarts(List<ShoppingCart> shoppingCarts) {
        this.shoppingCarts = shoppingCarts;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Long getGpu_id() {
        return gpu_id;
    }

    public void setGpu_id(Long gpu_id) {
        this.gpu_id = gpu_id;
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

    public String getChipset() {
        return chipset;
    }

    public void setChipset(String chipset) {
        this.chipset = chipset;
    }

    public Long getMemory() {
        return memory;
    }

    public void setMemory(Long memory) {
        this.memory = memory;
    }

    public Long getCore_clock() {
        return core_clock;
    }

    public void setCore_clock(Long core_clock) {
        this.core_clock = core_clock;
    }

    public Long getBoost_clock() {
        return boost_clock;
    }

    public void setBoost_clock(Long boost_clock) {
        this.boost_clock = boost_clock;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }
}
