import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { PuntajeService } from '../../service/puntaje.service';

@Component({
  standalone: true,
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  palabras = ['ANGULAR', 'FIREBASE', 'SERVICIO', 'COMPONENTE', 'IONIC'];
  palabraOculta: string = '';
  letrasAdivinadas: string[] = [];
  letrasErroneas: string[] = [];
  letrasDisponibles = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  intentosRestantes = 6;
  mensajeFinal = '';
  juegoTerminado = false;
  puntajeActual: number = 0;
  mejorPuntaje: number = 0;



  constructor(private _authService: AuthService, protected _puntajeService: PuntajeService ) {
    this.iniciarJuego();
  }

  iniciarJuego() {
    const random = Math.floor(Math.random() * this.palabras.length);

    const guardado = localStorage.getItem('mejorPuntaje');
    this.mejorPuntaje = guardado ? +guardado : 0;

    this.palabraOculta = this.palabras[random];
    this.letrasAdivinadas = [];
    this.intentosRestantes = 6;
    this.mensajeFinal = '';
    this.juegoTerminado = false;
  }

  seleccionarLetra(letra: string) {
    if (this.juegoTerminado || this.letrasAdivinadas.includes(letra)) return;

    this.letrasAdivinadas.push(letra);

    if (!this.palabraOculta.includes(letra)) {
      this.intentosRestantes--;
    }

    this.verificarEstado();
  }

  verificarEstado() {
    

    const palabraMostrada = this.obtenerPalabraConGuiones();
    if (!palabraMostrada.includes('_')) {
      this.mensajeFinal = '¡Ganaste!';
      this.juegoTerminado = true;
      this.puntajeActual += this.intentosRestantes
      this.guardarPuntaje()
    } else if (this.intentosRestantes === 0) {
      this.mensajeFinal = `Perdiste. La palabra era "${this.palabraOculta}"`;
      this.juegoTerminado = true;
      this.puntajeActual = 0
      this.guardarPuntaje()
    }

    

    if (this.juegoTerminado && this.puntajeActual > this.mejorPuntaje) {
    this.mejorPuntaje = this.puntajeActual;
    localStorage.setItem('mejorPuntaje', this.mejorPuntaje.toString());
  }
  }


  async guardarPuntaje(){
    const user_Id = await this._authService.getUserId();
    const error = await this._puntajeService.saveResult(user_Id, 'ahorcado', this.puntajeActual);
    if (error) {
      console.error('Error al guardar en Supabase:', error);
    } else {
      console.log('Resultado guardado');
    }
  }

  obtenerPalabraConGuiones(): string {
    return this.palabraOculta
      .split('')
      .map(letra => (this.letrasAdivinadas.includes(letra) ? letra : '_'))
      .join(' ');
  }

  estaDeshabilitada(letra: string): boolean {
    return this.letrasAdivinadas.includes(letra) || this.juegoTerminado;
  }

  esErronea(letra: string): boolean {
    return this.letrasErroneas.includes(letra) && !this.palabraOculta.includes(letra);
  }



}
