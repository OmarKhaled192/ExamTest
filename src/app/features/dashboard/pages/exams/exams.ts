import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../../../../shared/breadcrumb/breadcrumb';
import { PageHeaderComponent } from '../../../../shared/page-header/page-header';
import { ExamsService } from '../../../../core/services/exams.service';
import { Exam } from '../../../../core/models/exam.model';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, PageHeaderComponent],
  templateUrl: './exams.html',
})
export class ExamsPage implements OnInit {
  private readonly examsService = inject(ExamsService);
  diplomaId: string = '';
  diplomaTitle = 'Diploma Exams';

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

  exams: Exam[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.diplomaId = this.route.snapshot.params['diplomaId'];
    
    this.examsService.getExams(1, 100, this.diplomaId).subscribe({
      next: (res) => {
        this.exams = res.data;
        if (this.exams.length > 0 && this.exams[0].diploma) {
          this.diplomaTitle = this.exams[0].diploma.title;
          this.breadcrumbs[1].label = this.diplomaTitle;
        }
      },
      error: (err) => console.error('Error fetching exams', err)
    });
  }
}

