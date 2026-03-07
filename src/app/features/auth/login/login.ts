import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';
import { ForgotLink } from '../../../shared/forgot-link/forgot-link';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MainBtn, QuestionLink, ForgotLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username = '';
  password = '';
  showPassword = false;
  globalError = '';
  errors: { username?: string; password?: string } = {};

  onLogin() {
    this.errors = {};
    this.globalError = '';
    if (!this.username) this.errors.username = 'Your username is required';
    if (!this.password) this.errors.password = 'Your password is required';
    if (this.errors.username || this.errors.password) {
      this.globalError = 'Something went wrong';
    }
  }
}
