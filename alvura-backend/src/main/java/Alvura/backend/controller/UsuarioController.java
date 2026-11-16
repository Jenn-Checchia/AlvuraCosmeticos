package Alvura.backend.controller;

import Alvura.backend.model.Usuario;
import Alvura.backend.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // 1. Rota de CADASTRO (Registro)
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Usuario novoUsuario) {
        try {
            Usuario salvo = usuarioRepository.save(novoUsuario);
            return ResponseEntity.ok(salvo);
        } catch (Exception e) {
            // Se cair aqui, geralmente é porque o e-mail já existe no banco (Unique constraint)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail já cadastrado!");
        }
    }

    // 2. Rota de LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario tentativaLogin) {
        Optional<Usuario> usuario = usuarioRepository.findByEmailAndSenha(
                tentativaLogin.getEmail(), 
                tentativaLogin.getSenha()
        );

        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha inválidos.");
        }
    }
}