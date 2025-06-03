import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PregApiService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  async getPokemon(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.apiUrl}${id}`));
  }

  getRandomPokemonId(): number {
    return Math.floor(Math.random() * 151) + 1; // 1 a 151 (Primera generación)
  }
}
