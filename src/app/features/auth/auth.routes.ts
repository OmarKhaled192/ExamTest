import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { VerifyEmail } from './verify-email/verify-email';
import { VerifyOtp } from './verify-otp/verify-otp';
import { ForgotPassword } from './forgot-password/forgot-password';
import { CreatePassword } from './create-password/create-password';
import { Auth } from './auth';

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: Auth, // layout component
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'verify-email', component: VerifyEmail },
      { path: 'verify-otp', component: VerifyOtp },
      { path: 'forgot-password', component: ForgotPassword },
      { path: 'create-password', component: CreatePassword },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];