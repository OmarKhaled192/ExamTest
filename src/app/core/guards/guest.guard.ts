import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (!tokenService.hasToken()) {
    return true; // Let them see the login/register page
  }

  // Already logged in, redirect to dashboard
  router.navigate(['/dashboard/diplomas']);
  return false;
};
