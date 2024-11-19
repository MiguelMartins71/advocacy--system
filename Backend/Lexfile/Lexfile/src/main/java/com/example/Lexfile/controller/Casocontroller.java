package com.example.Lexfile.controller;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Lexfile.caso.Caso;
import com.example.Lexfile.caso.CasoRepository;
import com.example.Lexfile.caso.CasoRequestDTO;
import com.example.Lexfile.caso.CasoResponseDTO;


@RestController
@RequestMapping("caso")
public class Casocontroller {


      @Autowired
      private CasoRepository repository;
      @CrossOrigin(origins = "*", allowedHeaders= "*")  
      @PostMapping
          
      public void saveCaso(@RequestBody CasoRequestDTO data){

              Caso casodata = new Caso(data) ;
              repository.save(casodata);
               return;
      }
      @CrossOrigin(origins = "*", allowedHeaders= "*")  

    @GetMapping
    public List<CasoResponseDTO> getAll(){
               
        List<CasoResponseDTO> casolist = repository.findAll()
    .stream()
    .map(CasoResponseDTO::new) // Isso está correto se o construtor da record aceita 'Caso'
    .collect(Collectors.toList());

                         
        return casolist;
    }


    
}
