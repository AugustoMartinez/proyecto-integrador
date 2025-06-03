import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encuentra-tesoro',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './encuentra-tesoro.component.html',
  styleUrl: './encuentra-tesoro.component.css'
})
export class EncuentraTesoroComponent {
 gridSize = 10;
  grid: string[][] = [];
  treasureX = 0;
  treasureY = 0;
  attempts = 0;
  maxAttempts = 25;
  gameOver = false;
  message = '';
  bestScore = Number(localStorage.getItem('bestScore')) || null;

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array(this.gridSize).fill('')
    );
    this.treasureX = Math.floor(Math.random() * this.gridSize);
    this.treasureY = Math.floor(Math.random() * this.gridSize);
    this.attempts = 0;
    this.gameOver = false;
    this.message = '';
  }

  handleClick(x: number, y: number) {
    if (this.gameOver || this.grid[y][x]) return;

    this.attempts++;
    const distance = Math.sqrt(
      Math.pow(x - this.treasureX, 2) + Math.pow(y - this.treasureY, 2)
    );

    let clue = '';
    let color = '';

    if (x === this.treasureX && y === this.treasureY) {
      clue = '🎉 ¡Tesoro encontrado!';
      color = 'gold';
      this.grid[y][x] = color;
      this.message = clue;
      this.gameOver = true;

      if (!this.bestScore || this.attempts < this.bestScore) {
        localStorage.setItem('bestScore', this.attempts.toString());
        this.bestScore = this.attempts;
      }
      return;
    }

    if (distance < 1.5) {
      clue = '🔥 Ardiendo';
      color = 'red';
    } else if (distance < 3) {
      clue = '🌡️ Caliente';
      color = 'orange';
    } else {
      clue = '❄️ Frío';
      color = 'blue';
    }

    this.grid[y][x] = color;
    this.message = clue;

    if (this.attempts >= this.maxAttempts) {
      this.gameOver = true;
      this.message = '💀 ¡Te quedaste sin intentos!';
    }
  }

  getCellStyle(x: number, y: number) {
    const color = this.grid[y][x];
    return {
      'background-color': color || '#ccc',
      'border': '1px solid #999',
      'width': '40px',
      'height': '40px',
      'display': 'inline-block',
      'cursor': this.gameOver || color ? 'not-allowed' : 'pointer',
    };
  }
}
