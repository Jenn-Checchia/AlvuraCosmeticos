package Alvura.backend.controller;

import Alvura.backend.model.Categoria;
import Alvura.backend.repository.CategoriaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    private final CategoriaRepository repository;

    public CategoriaController(CategoriaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Categoria> listarTodas() {
        List<Categoria> categorias = repository.findAll();
        
        // Se a tabela estiver vazia, cria as categorias padrão do sistema
        if (categorias.isEmpty()) {
            categorias = Arrays.asList(
                new Categoria("Hidratante"),
                new Categoria("Vela"),
                new Categoria("Sabonete"),
                new Categoria("Escalda-pés"),
                new Categoria("Kits")
            );
            repository.saveAll(categorias);
        }
        
        return categorias;
    }

    @PostMapping
    public Categoria criar(@RequestBody Categoria novaCategoria) {
        return repository.save(novaCategoria);
    }
}