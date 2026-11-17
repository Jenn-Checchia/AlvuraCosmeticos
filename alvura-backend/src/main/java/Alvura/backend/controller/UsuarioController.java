package Alvura.backend.controller;

import Alvura.backend.model.Usuario;
import Alvura.backend.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // Injeção de dependência do repositório e do encriptador BCrypt
    public UsuarioController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 1. Rota de CADASTRO (Registo)
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Usuario novoUsuario) {
        try {
            // Encripta a palavra-passe antes de guardar no banco de dados
            String hashSenha = passwordEncoder.encode(novoUsuario.getSenha());
            novoUsuario.setSenha(hashSenha);
            
            Usuario salvo = usuarioRepository.save(novoUsuario);
            salvo.setSenha(null); // Não envia o hash para o navegador
            return ResponseEntity.ok(salvo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail já cadastrado!");
        }
    }

    // 2. Rota de LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario tentativaLogin) {
        // Agora procuramos APENAS pelo e-mail
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(tentativaLogin.getEmail());

        if (usuarioOpt.isPresent()) {
            Usuario usuarioNoBanco = usuarioOpt.get();
            
            // Compara a palavra-passe enviada pelo React com o Hash guardado no banco
            boolean senhaCorreta = passwordEncoder.matches(tentativaLogin.getSenha(), usuarioNoBanco.getSenha());
            
            if (senhaCorreta) {
                usuarioNoBanco.setSenha(null); // Não envia o hash para o navegador
                return ResponseEntity.ok(usuarioNoBanco);
            }
        }
        
        // Retorna erro genérico se o e-mail não existir ou a password estiver incorreta
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha inválidos.");
    }
    // 3. Listar usuários (sem expor o hash da senha)
    @GetMapping
    public List<Usuario> listarUsuarios() {
        List<Usuario> lista = usuarioRepository.findAll();
        lista.forEach(u -> u.setSenha(null));
        return lista;
    }

    // 4. Rota para EXCLUIR usuário
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirUsuario(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}