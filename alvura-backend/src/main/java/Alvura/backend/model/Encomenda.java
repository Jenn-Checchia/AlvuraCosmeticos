package Alvura.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "encomenda")
public class Encomenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cliente;
    private String ocasiao;
    private String produto;
    private String quantidade;
    private String aromas;
    private String dataEvento;

    @Column(length = 1500) // Texto grande para suportar todas as observações
    private String observacoes;
    
    private String status;

    // Construtor vazio obrigatório para o JPA
    public Encomenda() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCliente() { return cliente; }
    public void setCliente(String cliente) { this.cliente = cliente; }

    public String getOcasiao() { return ocasiao; }
    public void setOcasiao(String ocasiao) { this.ocasiao = ocasiao; }

    public String getProduto() { return produto; }
    public void setProduto(String produto) { this.produto = produto; }

    public String getQuantidade() { return quantidade; }
    public void setQuantidade(String quantidade) { this.quantidade = quantidade; }

    public String getAromas() { return aromas; }
    public void setAromas(String aromas) { this.aromas = aromas; }

    public String getDataEvento() { return dataEvento; }
    public void setDataEvento(String dataEvento) { this.dataEvento = dataEvento; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}