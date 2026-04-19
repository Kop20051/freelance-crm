import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://ygtcvvgomewzwhiiulhu.supabase.co',
      'sb_publishable_MR5wM9pb4CCQDPOymDUr6g_apKKkCNJ'
    );
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: 'https://freelance-crm-vladimirkiianov.netlify.app/dashboard'
      }
    });
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  getClients() {
    return this.supabase.from('clients').select('*');
  }

  addClient(client: { name: string; project: string; status: string; value: number }) {
    return this.supabase.from('clients').insert([client]).select();
  }
}