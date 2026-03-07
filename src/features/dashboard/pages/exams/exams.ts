import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../../../../app/shared/breadcrumb/breadcrumb';
import { PageHeaderComponent } from '../../../../app/shared/page-header/page-header';

interface Exam {
  id: number;
  title: string;
  questionCount: number;
  durationMinutes: number;
}

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, PageHeaderComponent],
  templateUrl: './exams.html',
})
export class ExamsPage implements OnInit {
  diplomaId = 1;
  diplomaTitle = 'Flutter Development';

  breadcrumbs = [
    { label: 'Home', path: '/dashboard' },
    { label: this.diplomaTitle, path: `/dashboard/diplomas/${this.diplomaId}` },
    { label: 'Exams' }
  ];

  headerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="12" y2="15"/>
  </svg>`;

  clockIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
  </svg>`;

  exams: Exam[] = [
    { id: 1, title: 'CSS Quiz', questionCount: 25, durationMinutes: 20 },
    { id: 2, title: 'Bootstrap Quiz', questionCount: 25, durationMinutes: 20 },
    { id: 3, title: 'Tailwind Quiz', questionCount: 25, durationMinutes: 20 },
    { id: 4, title: 'React Quiz', questionCount: 25, durationMinutes: 20 },
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.diplomaId = +this.route.snapshot.params['diplomaId'];
  }
}

