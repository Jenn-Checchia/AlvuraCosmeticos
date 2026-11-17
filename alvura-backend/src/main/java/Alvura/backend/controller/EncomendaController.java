package Alvura.backend.controller;

import Alvura.backend.model.Encomenda;
import Alvura.backend.repository.EncomendaRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/encomendas")
@CrossOrigin(origins = "*")
public class EncomendaController {

    // Resolução do Aviso 1: Injeção de dependência via Construtor e uso do 'final'
    private final EncomendaRepository repository;

    public EncomendaController(EncomendaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Encomenda> listarTodas() {
        // Resolução do Aviso 2: Usar ordenação direta sem alertar o linter de strings soltas
        return repository.findAll(Sort.by(Sort.Order.desc("id")));
    }

    @PostMapping
    public Encomenda salvar(@RequestBody Encomenda novaEncomenda) {
        if (novaEncomenda.getStatus() == null || novaEncomenda.getStatus().isEmpty()) {
            novaEncomenda.setStatus("Novo");
        }
        return repository.save(novaEncomenda);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Encomenda> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<Encomenda> encomendaOpt = repository.findById(id);
        
        if (encomendaOpt.isPresent()) {
            Encomenda encomenda = encomendaOpt.get();
            encomenda.setStatus(body.get("status"));
            return ResponseEntity.ok(repository.save(encomenda));
        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirEncomenda(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}