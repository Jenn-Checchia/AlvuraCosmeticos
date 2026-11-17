package Alvura.backend.config;

import Alvura.backend.model.Usuario;
import Alvura.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder; // Adicionado para criptografia

    // Injetamos o PasswordEncoder aqui no construtor
    public AdminSeeder(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Agora buscamos APENAS pelo e-mail
        Optional<Usuario> adminExistente = usuarioRepository.findByEmail("admin@alvura.com.br");

        if (adminExistente.isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNome("Administração");
            admin.setEmail("admin@alvura.com.br");
            
            // Criptografando a senha mestre antes de salvar!
            admin.setSenha(passwordEncoder.encode("1234"));
            
            admin.setRole("admin"); 

            usuarioRepository.save(admin);
            System.out.println("✅ Conta de Administrador mestre criada com sucesso no banco de dados (Senha hasheada).");
        } else {
            System.out.println("⚡ Conta de Administrador já existe. Nenhuma ação necessária.");
        }
    }
}