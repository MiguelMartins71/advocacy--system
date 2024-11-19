package com.example.Lexfile.caso;

import java.time.LocalDate;
import java.time.LocalTime;

public record CasoRequestDTO(String caso, LocalDate data, LocalTime hora, String image, String descricao) {



    
}
