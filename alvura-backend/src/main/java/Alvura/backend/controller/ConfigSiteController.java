package Alvura.backend.controller;

import Alvura.backend.model.ConfigSite;
import Alvura.backend.repository.ConfigSiteRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/config")
@CrossOrigin(origins = "*")
public class ConfigSiteController {

    private final ConfigSiteRepository repository;

    public ConfigSiteController(ConfigSiteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ConfigSite getConfig() {
        // Busca a config. Se não existir, cria a padrão e salva na hora.
        return repository.findById(1L).orElseGet(() -> {
            ConfigSite padrao = new ConfigSite();
            padrao.setWhatsapp("5567999999999");
            padrao.setInstagram("@alvura.cosmeticos");
            padrao.setEmail("oi@alvura.com.br");
            padrao.setEndereco("Campo Grande, MS — Produção Artesanal");
            padrao.setHorarioAtendimento("Seg–sex, das 9h às 18h");
            padrao.setHeroTitulo("Catálogo");
            padrao.setHeroSubtitulo("Beleza que nasce da natureza! Descubra uma nova forma de cuidar de si. Descubra Alvura.");
            padrao.setImagemHero("/assets/products/vela cereja.png");
            padrao.setTextoContato("Fale com humanos!");
            padrao.setImagemAtelier("/assets/products/vela floral.png");
            
            return repository.save(padrao);
        });
    }

    @PutMapping
    public ConfigSite atualizarConfig(@RequestBody ConfigSite novaConfig) {
        novaConfig.setId(1L); // Garante que nunca crie uma segunda linha
        return repository.save(novaConfig);
    }
}