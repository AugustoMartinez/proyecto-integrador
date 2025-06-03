import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _supabaseClient= inject(SupabaseService).supabaseClient;
  loggedIn = signal(false)

  constructor() {
    // Verificar sesión al cargar
  this._supabaseClient.auth.getSession().then(({ data }) => {
    this.loggedIn.set(!!data.session);
  });

    // Escuchar cambios en la sesión
  this._supabaseClient.auth.onAuthStateChange((_, session) => {
    this.loggedIn.set(!!session);
  });
  }

  session() {
    return this._supabaseClient.auth.getSession();
  }

  signUp(credentials: SignUpWithPasswordCredentials) {
    return this._supabaseClient.auth.signUp(credentials);
  }
  
  login(credentials: SignUpWithPasswordCredentials){
    return this._supabaseClient.auth.signInWithPassword(credentials);
  }
  singOut() {
    return this._supabaseClient.auth.signOut();
  }

  async getUserId(): Promise<string | null> {
  const { data: { user }, error } = await this._supabaseClient.auth.getUser();
  return user?.id || null;
}
}
