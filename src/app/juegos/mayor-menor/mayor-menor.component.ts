import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { PuntajeService } from '../../service/puntaje.service';


@Component({
  selector: 'app-mayor-menor',
  imports: [CommonModule,FormsModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css',
  standalone: true
})
export class MayorMenorComponent {
deck: number[] = [];
  currentCard: number = 0;
  nextCard: number | null = null;
  score: number = 0;
  gameOver: boolean = false;

  constructor(private _authService: AuthService, protected _puntajeService: PuntajeService) {
    this.resetGame();
  }

  shuffleDeck() {
    const numbers = Array.from({ length: 13 }, (_, i) => i + 1); // cartas del 1 al 13
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  }

  guess(choice: 'mayor' | 'menor') {
    if (this.deck.length === 0 || this.gameOver) return;

    this.nextCard = this.deck.pop()!;
    const correct =
      (choice === 'mayor' && this.nextCard > this.currentCard) ||
      (choice === 'menor' && this.nextCard < this.currentCard);

    if (correct) {
      this.score++;
      this.currentCard = this.nextCard;
      this.nextCard = null;
    } else {
      this.guardarPuntaje()
      this.gameOver = true;
    }
  }

  resetGame() {
    this.deck = this.shuffleDeck();
    this.currentCard = this.deck.pop()!;
    this.nextCard = null;
    this.score = 0;
    this.gameOver = false;
  }

  async guardarPuntaje(){
    const user_Id = await this._authService.getUserId();
    const error = await this._puntajeService.saveResult(user_Id, 'mayor-menor', this.score);
    if (error) {
      console.error('Error al guardar en Supabase:', error);
    } else {
      console.log('Resultado guardado');
    }
  }
}
