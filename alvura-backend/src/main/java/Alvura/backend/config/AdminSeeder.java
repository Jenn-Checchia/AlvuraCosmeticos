package Alvura.backend.config;

import Alvura.backend.model.Usuario;
import Alvura.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;

    public AdminSeeder(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Optional<Usuario> adminExistente = usuarioRepository.findByEmailAndSenha("admin@alvura.com.br", "1234");

        if (adminExistente.isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNome("Administração");
            admin.setEmail("admin@alvura.com.br");
            admin.setSenha("1234");
            admin.setRole("admin"); 

            usuarioRepository.save(admin);
            System.out.println("✅ Conta de Administrador mestre criada com sucesso no banco de dados.");
        } else {
            System.out.println("⚡ Conta de Administrador já existe. Nenhuma ação necessária.");
        }
    }
}