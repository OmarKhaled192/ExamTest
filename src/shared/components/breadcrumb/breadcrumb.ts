import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="breadcrumb">
      <ng-container *ngFor="let item of items; let last = last">
        <a *ngIf="item.path && !last" [routerLink]="item.path" class="breadcrumb__link">{{ item.label }}</a>
        <span *ngIf="!item.path || last" class="breadcrumb__current" [class.breadcrumb__current--active]="last">{{ item.label }}</span>
        <span *ngIf="!last" class="breadcrumb__sep">/</span>
      </ng-container>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      color: var(--text-muted);
      padding: 12px 24px;

      &__link {
        color: var(--text-muted);
        text-decoration: none;
        transition: color var(--transition);
        &:hover { color: var(--primary); }
      }

      &__sep { color: var(--border); }

      &__current {
        color: var(--text-muted);
        &--active { color: var(--primary); font-weight: 500; }
      }
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}

