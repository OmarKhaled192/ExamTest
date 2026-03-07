import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout';
import { DiplomasPage } from './pages/diplomas/diplomas';
import { ExamsPage } from './pages/exams/exams';
import { QuestionsPage } from './pages/questions/questions';
import { AccountPage } from './pages/account/account';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'diplomas', pathMatch: 'full' },

      {
        path: 'diplomas',
        component: DiplomasPage
      },
      {
        path: 'diplomas/:diplomaId/exams',
        component: ExamsPage
      },
      {
        path: 'diplomas/:diplomaId/exams/:examId/questions',
        component: QuestionsPage
      },
      {
        path: 'account',
        component: AccountPage
      }
    ]
  }
];