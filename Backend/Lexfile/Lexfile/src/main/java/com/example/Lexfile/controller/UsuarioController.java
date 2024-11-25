package com.example.Lexfile.controller;

import com.example.Lexfile.models.Perfil;
import com.example.Lexfile.models.Usuario;
import com.example.Lexfile.repositories.PerfilRepository;
import com.example.Lexfile.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*", allowedHeaders = "*") // Para permitir requisições do front
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PerfilRepository perfilRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public String registerUser(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String perfil
    ) {
        Optional<Perfil> perfilOptional = perfilRepository.findById(Long.parseLong(perfil));
        if (perfilOptional.isEmpty()) {
            return "Perfil não encontrado!";
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setPerfis(Set.of(perfilOptional.get()));

        usuarioRepository.save(usuario);

        return "Usuário registrado com sucesso!";
    }
}
