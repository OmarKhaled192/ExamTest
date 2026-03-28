import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';
import { ForgotLink } from '../../../shared/forgot-link/forgot-link';
import { AuthService } from '../../../../../dist/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MainBtn, QuestionLink, ForgotLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);

  showPassword = false;
  globalError: string = '';

  // Reactive form without FormBuilder
  loginForm: FormGroup<any> = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  // Getter to access form controls in template
  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.globalError = '';
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.globalError = 'Please fix the errors before submitting.';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login success:', res);
        if (res.status == 401) {
          this.globalError = res?.error?.message || 'Something went wrong. Please try again.';
        } else {
          this.router.navigate(['/dashboard/diplomas']);
        }
      },
      error: (err) => {
        console.error(err);
        this.globalError = err?.error?.message || 'Something went wrong. Please try again.';
      }
    });
  }
}
