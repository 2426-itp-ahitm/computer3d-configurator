package at.ac.htl.features.motherboard;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class motherboard {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long motherboard_id;
    public String name;
    public Float price;
    public String socket;
    public String form_factor;
    public Long max_memory;
    public Long memory_slots;
    public String color;
}

