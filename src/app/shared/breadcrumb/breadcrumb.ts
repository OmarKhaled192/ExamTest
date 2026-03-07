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
    <nav class="flex items-center gap-1.5 px-6 py-3 font-mono text-xs text-gray-400">
      <ng-container *ngFor="let item of items; let last = last">
        <a
          *ngIf="item.path && !last"
          [routerLink]="item.path"
          class="hover:text-blue-600 transition-colors duration-150"
        >{{ item.label }}</a>
        <span
          *ngIf="!item.path || last"
          [class]="last ? 'text-blue-600 font-medium' : ''"
        >{{ item.label }}</span>
        <span *ngIf="!last" class="text-gray-300">/</span>
      </ng-container>
    </nav>
  `,
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}

