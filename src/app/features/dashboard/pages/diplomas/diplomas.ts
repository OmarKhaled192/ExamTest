import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../../../shared/breadcrumb/breadcrumb';
import { PageHeaderComponent } from '../../../../shared/page-header/page-header';

import { DiplomasService } from '../../../../core/services/diplomas.service';
import { Diploma } from '../../../../core/models/diploma.model';

@Component({
  selector: 'app-diplomas',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, PageHeaderComponent],
  templateUrl: './diplomas.html',
  styleUrls: ['./diplomas.scss']
})
export class DiplomasPage implements OnInit {
  private readonly diplomasService = inject(DiplomasService);
  breadcrumbs = [{ label: 'Home', path: '/dashboard' }];

  headerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>`;

  diplomas: Diploma[] = [];

  ngOnInit() {
    this.diplomasService.getDiplomas().subscribe({
      next: (res) => {
        this.diplomas = res.data;
      },
      error: (err) => {
        console.error('Error fetching diplomas', err);
      }
    });
  }
}

