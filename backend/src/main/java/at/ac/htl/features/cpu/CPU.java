package at.ac.htl.features.cpu;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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
}

