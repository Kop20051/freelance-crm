import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async register() {
    const { error } = await this.supabase.signUp(this.email, this.password);
    if (error) {
      this.error = error.message;
    } else {
      this.success = 'Account created! You can now sign in.';
      setTimeout(() => this.router.navigate(['/login']), 1500);
    }
  }
}