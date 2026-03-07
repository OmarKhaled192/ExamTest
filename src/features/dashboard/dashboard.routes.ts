import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'diplomas', pathMatch: 'full' },
      {
        path: 'diplomas',
        loadComponent: () => import('./pages/diplomas/diplomas').then(m => m.DiplomasPage)
      },
      {
        path: 'diplomas/:diplomaId/exams',
        loadComponent: () => import('./pages/exams/exams').then(m => m.ExamsPage)
      },
      {
        path: 'diplomas/:diplomaId/exams/:examId/questions',
        loadComponent: () => import('./pages/questions/questions').then(m => m.QuestionsPage)
      },
      {
        path: 'account',
        loadComponent: () => import('./pages/account/account').then(m => m.AccountPage)
      }
    ]
  }
];

