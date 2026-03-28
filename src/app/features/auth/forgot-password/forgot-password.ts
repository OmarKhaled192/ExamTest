import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';
import { AuthService } from '../../../../../dist/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MainBtn, QuestionLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  loading = false;
  router = inject(Router)
  authService = inject(AuthService)
  onContinue() {
    if (this.form.invalid) return;

    this.loading = true;

    this.authService.forgotPassword({
      email: this.form.controls.email.value as string
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate(['/verify-email'], {
          queryParams: {
            email: this.form.controls.email.value,
            token: res.resetToken
          }
        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
