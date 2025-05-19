package at.ac.htl.features.cpu;

import java.util.List;

import at.ac.htl.features.shoppingcart.ShoppingCart;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class CPU {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long cpu_id;
    String name;
    Float price;
    Long core_count;
    Float core_clock;
    Float boost_clock;
    Long tdp;
    String graphics;
    Boolean smt;
    String socket;
    String img;
    String model;

    @OneToMany(mappedBy = "cpu")
    private List<ShoppingCart> shoppingCarts;

    public List<ShoppingCart> getShoppingCarts() {
        return shoppingCarts;
    }

    public void setShoppingCarts(List<ShoppingCart> shoppingCarts) {
        this.shoppingCarts = shoppingCarts;
    }

    public String getSocket() {
        return socket;
    }

    public void setSocket(String socket) {
        this.socket = socket;
    }

    public Long getCpu_id() {
        return cpu_id;
    }

    public void setCpu_id(Long cpu_id) {
        this.cpu_id = cpu_id;
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

    public Long getCore_count() {
        return core_count;
    }

    public void setCore_count(Long core_count) {
        this.core_count = core_count;
    }

    public Float getCore_clock() {
        return core_clock;
    }

    public void setCore_clock(Float core_clock) {
        this.core_clock = core_clock;
    }

    public Float getBoost_clock() {
        return boost_clock;
    }

    public void setBoost_clock(Float boost_clock) {
        this.boost_clock = boost_clock;
    }

    public Long getTdp() {
        return tdp;
    }

    public void setTdp(Long tdp) {
        this.tdp = tdp;
    }

    public String getGraphics() {
        return graphics;
    }

    public void setGraphics(String graphics) {
        this.graphics = graphics;
    }

    public Boolean getSmt() {
        return smt;
    }

    public void setSmt(Boolean smt) {
        this.smt = smt;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}

