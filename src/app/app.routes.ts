// app.routes.ts
import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { DASHBOARD_ROUTES } from './features/dashboard/dashboard.routes';
DASHBOARD_ROUTES
export const routes: Routes = [
  ...authRoutes, // spread auth routes
  ...DASHBOARD_ROUTES,
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' }
];