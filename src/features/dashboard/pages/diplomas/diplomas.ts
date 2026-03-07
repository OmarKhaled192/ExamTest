import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';

interface Diploma {
  id: number;
  title: string;
  image: string;
  color: string;
}

@Component({
  selector: 'app-diplomas',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, PageHeaderComponent],
  templateUrl: './diplomas.html',
  styleUrl: './diplomas.scss'
})
export class DiplomasPage {
  breadcrumbs = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Diplomas' }
  ];

  diplomas: Diploma[] = [
    { id: 1, title: 'Flutter Development', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80', color: '#0ea5e9' },
    { id: 2, title: 'AI & ML Development', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80', color: '#8b5cf6' },
    { id: 3, title: 'Back-End Web Development', image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80', color: '#06b6d4' },
    { id: 4, title: 'Data Analysis', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', color: '#f59e0b' },
    { id: 5, title: 'Software Testing', image: 'https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=400&q=80', color: '#10b981' },
    { id: 6, title: 'Cyber Security', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80', color: '#ef4444' },
  ];

  headerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>`;
}

