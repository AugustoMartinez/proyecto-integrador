import { Component } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  imports: [],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent {
  nombre : string = "Augusto"
  apellido : string = "Martinez"
  imagen! : string
  explicacion : string = "Juego de estilo beatem-ups"
  
}
