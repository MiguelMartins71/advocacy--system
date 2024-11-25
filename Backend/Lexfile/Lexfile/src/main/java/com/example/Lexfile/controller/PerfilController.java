package com.example.Lexfile.controller;

import com.example.Lexfile.models.Perfil;
import com.example.Lexfile.repositories.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfis")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PerfilController {

    @Autowired
    private PerfilRepository perfilRepository;

    @GetMapping
    public List<Perfil> getAllPerfis() {
        return perfilRepository.findAll();
    }
}
