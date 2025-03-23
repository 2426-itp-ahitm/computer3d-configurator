package at.ac.htl.features.shoppingcart;

import at.ac.htl.features.casing.Case;
import at.ac.htl.features.cpu.CPU;
import at.ac.htl.features.cpuCooler.CpuCooler;
import at.ac.htl.features.internalHarddrive.InternalHarddrive;
import at.ac.htl.features.motherboard.Motherboard;
import at.ac.htl.features.gpu.GPU;
import at.ac.htl.features.powersupply.Powersupply;
import at.ac.htl.features.ram.RAM;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shopping_cart")
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "cpu_id")
    private CPU cpu;

    @OneToOne
    @JoinColumn(name = "motherboard_id")
    private Motherboard motherboard;

    @OneToOne
    @JoinColumn(name = "gpu_id")
    private GPU gpu;

    @OneToOne
    @JoinColumn(name = "ram_id")
    private RAM ram;

    @OneToOne
    @JoinColumn(name = "case_id")
    private Case computerCase;

    @OneToOne
    @JoinColumn(name = "cpu_cooler_id")
    private CpuCooler cpuCooler;

    @OneToOne
    @JoinColumn(name = "internalHarddrive_id")
    private InternalHarddrive internalHarddrive;

    @OneToOne
    @JoinColumn(name="powersupply_id")
    private Powersupply powersupply;

    private Double totalPrice;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Case getComputerCase() {
        return computerCase;
    }

    public void setComputerCase(Case computerCase) {
        this.computerCase = computerCase;
    }

    public CpuCooler getCpuCooler() {
        return cpuCooler;
    }

    public void setCpuCooler(CpuCooler cpuCooler) {
        this.cpuCooler = cpuCooler;
    }

    public InternalHarddrive getInternalHarddrive() {
        return internalHarddrive;
    }

    public void setInternalHarddrive(InternalHarddrive internalHarddrive) {
        this.internalHarddrive = internalHarddrive;
    }

    public Powersupply getPowersupply() {
        return powersupply;
    }

    public void setPowersupply(Powersupply powersupply) {
        this.powersupply = powersupply;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public CPU getCpu() {
        return cpu;
    }

    public void setCpu(CPU cpu) {
        this.cpu = cpu;
    }

    public Motherboard getMotherboard() {
        return motherboard;
    }

    public void setMotherboard(Motherboard motherboard) {
        this.motherboard = motherboard;
    }

    public GPU getGpu() {
        return gpu;
    }

    public void setGpu(GPU gpu) {
        this.gpu = gpu;
    }

    public RAM getRam() {
        return ram;
    }

    public void setRam(RAM ram) {
        this.ram = ram;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
