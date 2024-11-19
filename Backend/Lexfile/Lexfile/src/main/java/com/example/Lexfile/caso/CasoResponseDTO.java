package com.example.Lexfile.caso;
import java.time.LocalDate;
import java.time.LocalTime;

public record CasoResponseDTO(Long Id,String caso, LocalDate data, LocalTime hora, String image, String descricao) {
    
public CasoResponseDTO(Caso caso){

    this(caso.getId(), caso.getCaso(), caso.getData(), caso.getHora(), caso.getImage(), caso.getDescricao());

}

}
