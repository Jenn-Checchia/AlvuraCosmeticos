package Alvura.backend.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;
import java.util.List;

@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String tipo; // Substitui 'categoria' para alinhar com o front
    private String disponibilidade; // "Em estoque" ou "Sob encomenda"
    private String tamanho;
    private BigDecimal preco;
    private String imagem;
    private String descricao;
    private boolean personalizavel;
    
    @ElementCollection
    private List<String> ingredientes;

    @ElementCollection
    private List<String> opcoesAroma;

    public Produto() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getTamanho() { return tamanho; }
    public void setTamanho(String tamanho) { this.tamanho = tamanho; }

    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }

    public String getImagem() { return imagem; }
    public void setImagem(String imagem) { this.imagem = imagem; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public boolean isPersonalizavel() { return personalizavel; }
    public void setPersonalizavel(boolean personalizavel) { this.personalizavel = personalizavel; }

    public List<String> getIngredientes() { return ingredientes; }
    public void setIngredientes(List<String> ingredientes) { this.ingredientes = ingredientes; }

    public List<String> getOpcoesAroma() { return opcoesAroma; }
    public void setOpcoesAroma(List<String> opcoesAroma) { this.opcoesAroma = opcoesAroma; }

    public String getDisponibilidade() {return disponibilidade;}
    public void setDisponibilidade(String disponibilidade) {this.disponibilidade = disponibilidade;}

}