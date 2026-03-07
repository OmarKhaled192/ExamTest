import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, MainBtn, QuestionLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  email = '';
  constructor(private router: Router) {}
  onContinue() { this.router.navigate(['/verify-email']); }
}
