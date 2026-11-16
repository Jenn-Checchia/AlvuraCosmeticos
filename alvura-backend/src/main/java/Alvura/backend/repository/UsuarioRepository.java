package Alvura.backend.repository;

import Alvura.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

import java.util.Optional;

//@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // O Spring cria o SQL automaticamente: "SELECT * FROM usuario WHERE email = ? AND senha = ?"
    Optional<Usuario> findByEmailAndSenha(String email, String senha);
}