package at.ac.htl.features.cpu;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CPU {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long cpu_id;
    public String name ;
    public Float price;
    public Long core_count;
    public Float core_clock;
    public Float boost_clock;
    public Long tdp;
    public String graphics;
    public Boolean smt;
    public String socket;
}

