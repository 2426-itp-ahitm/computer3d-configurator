package at.ac.htl.features.casing;

import at.ac.htl.features.shoppingcart.ShoppingCart;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "casing")
public class Case {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long case_id;
    String name;
    Float price;
    String type;
    String color;
    Long psu;
    String side_panel;
    Float external_volume;
    Long internal_35_bays;
    String img;

    @OneToMany(mappedBy = "computerCase")
    private List<ShoppingCart> shoppingCarts;

    public List<ShoppingCart> getShoppingCarts() {
        return shoppingCarts;
    }

    public void setShoppingCarts(List<ShoppingCart> shoppingCarts) {
        this.shoppingCarts = shoppingCarts;
    }

    public Long getCase_id() {
        return case_id;
    }

    public void setCase_id(Long case_id) {
        this.case_id = case_id;
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getPsu() {
        return psu;
    }

    public void setPsu(Long psu) {
        this.psu = psu;
    }

    public String getSide_panel() {
        return side_panel;
    }

    public void setSide_panel(String side_panel) {
        this.side_panel = side_panel;
    }

    public Float getExternal_volume() {
        return external_volume;
    }

    public void setExternal_volume(Float external_volume) {
        this.external_volume = external_volume;
    }

    public Long getInternal_35_bays() {
        return internal_35_bays;
    }

    public void setInternal_35_bays(Long internal_35_bays) {
        this.internal_35_bays = internal_35_bays;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
