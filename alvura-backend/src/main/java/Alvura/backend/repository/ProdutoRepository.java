package Alvura.backend.repository;

import Alvura.backend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    // Vazio mesmo! O JpaRepository já traz todos os comandos SQL prontos.
}