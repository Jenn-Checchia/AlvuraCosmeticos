package Alvura.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class UploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity <Map<String,String>> uploadImagem(@RequestParam("file") MultipartFile file) {
        try {
            // 1. Cria a pasta "uploads" na raiz do backend se ela não existir
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 2. Extrai a extensão original da foto (ex: .png, .jpg)
            String originalFileName = file.getOriginalFilename();
            String extensao = originalFileName != null && originalFileName.contains(".")
                    ? originalFileName.substring(originalFileName.lastIndexOf("."))
                    : ".png";

            // 3. Gera um nome único (ex: 550e8400-e29b-41d4-a716-446655440000.png)
            String nomeArquivoUnico = UUID.randomUUID().toString() + extensao;

            // 4. Salva fisicamente o arquivo na pasta
            Path filePath = uploadPath.resolve(nomeArquivoUnico);
            Files.copy(file.getInputStream(), filePath);

            // 5. Monta a URL pública para devolver ao React
            String fileUrl = "http://localhost:8080/uploads/" + nomeArquivoUnico;
            Map<String, String> resposta = new HashMap<>();
            resposta.put("url", fileUrl);

            return ResponseEntity.ok(resposta);

        } catch (IOException e) {
            System.err.println("Erro ao salvar imagem: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
}