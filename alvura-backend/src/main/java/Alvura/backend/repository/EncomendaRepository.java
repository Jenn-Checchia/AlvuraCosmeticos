package Alvura.backend.repository;

import Alvura.backend.model.Encomenda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EncomendaRepository extends JpaRepository<Encomenda, Long> {
}