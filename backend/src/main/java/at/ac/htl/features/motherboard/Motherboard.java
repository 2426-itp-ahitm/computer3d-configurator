package at.ac.htl.features.motherboard;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Motherboard {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long motherboard_id;
    String name;
    Float price;
    String socket;
    String form_factor;
    Long max_memory;
    Long memory_slots;
    String color;

    public String getSocket() {
        return socket;
    }

    public void setSocket(String socket) {
        this.socket = socket;
    }
}

