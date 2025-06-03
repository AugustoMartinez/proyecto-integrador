import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PregApiService } from '../../service/preg-api.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { PuntajeService } from '../../service/puntaje.service';

@Component({
  selector: 'app-preguntados',
  imports: [CommonModule, HttpClientModule],
  providers: [PregApiService],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
  standalone: true
})
export class PreguntadosComponent implements OnInit{
  pokemonImage: string = '';
  correctAnswer: string = '';
  options: string[] = [];
  showAnswer = false;
  isCorrect = false;

  score = 0;
  bestScore = 0;
  timer = 10;
  private timerInterval: any;

  constructor(private pokemonService: PregApiService, private _authService: AuthService, protected _puntajeService: PuntajeService) {}

  ngOnInit() {
    
    this.loadBestScore();
    this.loadQuestion();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  async loadQuestion() {
   this.showAnswer = false;
    this.options = [];
    this.timer = 10;
    this.clearTimer();
    this.startTimer();

    const correctId = this.pokemonService.getRandomPokemonId();
    const correctPokemon = await this.pokemonService.getPokemon(correctId);
    this.correctAnswer = correctPokemon.name;
    this.pokemonImage = correctPokemon.sprites.other['official-artwork'].front_default;

    const ids = new Set<number>([correctId]);
    while (ids.size < 4) {
      ids.add(this.pokemonService.getRandomPokemonId());
    }

    const optionNames: string[] = [];
    for (const id of ids) {
      const poke = await this.pokemonService.getPokemon(id);
      optionNames.push(poke.name);
    }

    this.options = this.shuffleArray(optionNames);
  }

  checkAnswer(answer: string) {
    if (this.showAnswer) return;

    this.showAnswer = true;
    this.clearTimer();
    this.isCorrect = answer === this.correctAnswer;

    if (this.isCorrect) {
      this.score++;
      this.updateBestScore();
      this.guardarPuntaje();
    } else {
      this.score = 0; // reiniciar al fallar
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.showAnswer = true;
        this.clearTimer();
        this.isCorrect = false;
        this.score = 0;
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  loadBestScore() {
    const saved = localStorage.getItem('pokemonBestScore');
    this.bestScore = saved ? parseInt(saved, 10) : 0;
  }

  updateBestScore() {
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('pokemonBestScore', this.bestScore.toString());
    }
  }

  async guardarPuntaje(){
    const user_Id = await this._authService.getUserId();
    const error = await this._puntajeService.saveResult(user_Id, 'pokemon', this.score);
    if (error) {
      console.error('Error al guardar en Supabase:', error);
    } else {
      console.log('Resultado guardado');
    }
  }
}
