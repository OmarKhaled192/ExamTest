import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex items-stretch mb-6 overflow-hidden" style="border-radius: 0 8px 8px 0;">
      <!-- Back button: separate white-ish panel left of blue bar -->
      <a
        *ngIf="backPath"
        [routerLink]="backPath"
        class="flex items-center justify-center w-12 bg-white border border-r-0 border-gray-200 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150 flex-shrink-0"
        style="border-radius: 8px 0 0 8px;"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </a>
      <!-- Blue title bar -->
      <div class="flex items-center gap-3 bg-blue-600 px-7 py-4 flex-1">
        <span class="flex items-center text-white opacity-90" [innerHTML]="icon"></span>
        <h1 class="font-mono font-bold text-white text-2xl tracking-tight">{{ title }}</h1>
      </div>
    </div>
  `,
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() icon = '';
  @Input() backPath?: string;
}

