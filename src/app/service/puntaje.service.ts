import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {
private _supabaseClient= inject(SupabaseService).supabaseClient;

  async saveResult(id: any, game: string, puntaje: number) {
    const { error } = await this._supabaseClient.from('puntaje').insert(
      {
        usuario_id: id,
        game: game,
        puntaje: puntaje
      }
    );
    return error;
  }

  async getTopResults(limit = 5) {
    const { data, error } = await this._supabaseClient
      .from('resultados')
      .select(`usuarios (
      nombre
    ), dificultad, tiempo`)
      .order('tiempo', { ascending: true })
      .limit(limit);
    return { data: data || [], error };
  }

  async getTopResultsFacil(limit = 5) {
    const { data, error } = await this._supabaseClient
      .from('resultados')
      .select(`usuarios (
      nombre
    ), dificultad, tiempo`).eq('dificultad','facil')
      .order('tiempo', { ascending: true })
      .limit(limit);
    return { data: data || [], error };
  }

    async getTopResultsDificil(limit = 5) {
    const { data, error } = await this._supabaseClient
      .from('resultados')
      .select(`usuarios (
      nombre
    ), dificultad, tiempo`).eq('dificultad','dificil')
      .order('tiempo', { ascending: true })
      .limit(limit);
    return { data: data || [], error };
  }

  async getTopResultsMedio(limit = 5) {
    const { data, error } = await this._supabaseClient
      .from('resultados')
      .select(`usuarios (
      nombre
    ), dificultad, tiempo`).eq('dificultad','medio')
      .order('tiempo', { ascending: true })
      .limit(limit);
    return { data: data || [], error };
  }
}
