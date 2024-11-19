package com.example.Lexfile.caso;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "caso")
@Entity(name = "caso")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "Id")


public class Caso {


@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
private long Id;

private String caso;

private LocalDate data;

private LocalTime hora;

public String image;
private String descricao;

public Caso(CasoRequestDTO data){

   this.image = data.image();
   this.caso = data.caso();
   this.data = data.data();
   this.hora = data.hora();
   this.descricao = data.descricao();

}







    
}
