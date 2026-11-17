package Alvura.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "config_site")
public class ConfigSite {

    @Id
    private Long id = 1L; // Travamos o ID em 1 para existir apenas um registro!

    private String whatsapp;
    private String instagram;
    private String email;
    private String endereco;
    private String horarioAtendimento;
    
    private String heroTitulo;
    
    @Column(length = 1000)
    private String heroSubtitulo;
    
    private String imagemHero;
    
    @Column(length = 1000)
    private String textoContato;
    
    private String imagemAtelier;

    public ConfigSite() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = 1L; } // Força a ser sempre 1

    public String getWhatsapp() { return whatsapp; }
    public void setWhatsapp(String whatsapp) { this.whatsapp = whatsapp; }

    public String getInstagram() { return instagram; }
    public void setInstagram(String instagram) { this.instagram = instagram; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getHorarioAtendimento() { return horarioAtendimento; }
    public void setHorarioAtendimento(String horarioAtendimento) { this.horarioAtendimento = horarioAtendimento; }

    public String getHeroTitulo() { return heroTitulo; }
    public void setHeroTitulo(String heroTitulo) { this.heroTitulo = heroTitulo; }

    public String getHeroSubtitulo() { return heroSubtitulo; }
    public void setHeroSubtitulo(String heroSubtitulo) { this.heroSubtitulo = heroSubtitulo; }

    public String getImagemHero() { return imagemHero; }
    public void setImagemHero(String imagemHero) { this.imagemHero = imagemHero; }

    public String getTextoContato() { return textoContato; }
    public void setTextoContato(String textoContato) { this.textoContato = textoContato; }

    public String getImagemAtelier() { return imagemAtelier; }
    public void setImagemAtelier(String imagemAtelier) { this.imagemAtelier = imagemAtelier; }
}