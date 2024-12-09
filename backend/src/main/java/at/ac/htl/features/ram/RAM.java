package at.ac.htl.features.ram;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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
}
