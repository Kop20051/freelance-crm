import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async login() {
    const { error } = await this.supabase.signIn(this.email, this.password);
    if (error) {
      this.error = error.message;
    } else {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    }
  }
}