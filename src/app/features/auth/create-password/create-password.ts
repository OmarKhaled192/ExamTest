import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';
import { AuthService } from '../../../../../dist/auth';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MainBtn, QuestionLink],
  templateUrl: './create-password.html',
  styleUrl: './create-password.scss'
})
export class CreatePassword implements OnInit {

  @Input() token!: string;

  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  showPassword = false;
  showConfirm = false;

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!this.token) {
      this.token = this.route.snapshot.queryParamMap.get('token') || '';
    }
  }

  onReset() {
    if (this.form.invalid) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const password = this.form.controls.password.value || '';
    const confirmPassword = this.form.controls.confirmPassword.value || '';

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.resetPassword({
      token: this.token,
      newPassword: password,
      confirmPassword: confirmPassword
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = res.message || 'Password reset successful';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Something went wrong';
      }
    });
  }
}
