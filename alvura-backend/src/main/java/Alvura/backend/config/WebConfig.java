package Alvura.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Tudo que acessar /uploads/ na URL vai buscar na pasta "uploads" física do projeto
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}