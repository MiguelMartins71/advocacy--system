package com.example.Lexfile.config;

import com.example.Lexfile.models.Perfil;
import com.example.Lexfile.models.Usuario;
import com.example.Lexfile.repositories.PerfilRepository;
import com.example.Lexfile.repositories.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UsuarioRepository usuarioRepository, PerfilRepository perfilRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            Perfil adminRole = perfilRepository.save(new Perfil("ROLE_ADMIN"));
            Perfil userRole = perfilRepository.save(new Perfil("ROLE_USER"));

            usuarioRepository.save(new Usuario(
                    "admin",
                    passwordEncoder.encode("admin123"),
                    Set.of(adminRole)
            ));

            usuarioRepository.save(new Usuario(
                    "advogado",
                    passwordEncoder.encode("user123"),
                    Set.of(userRole)
            ));

            usuarioRepository.save(new Usuario(
                    "assistente",
                    passwordEncoder.encode("user123"),
                    Set.of(userRole)
            ));
        };
    }
}
