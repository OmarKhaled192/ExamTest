import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-header">
      <button *ngIf="backPath" class="page-header__back" [routerLink]="backPath">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </button>
      <div class="page-header__content">
        <span class="page-header__icon" [innerHTML]="icon"></span>
        <h1 class="page-header__title">{{ title }}</h1>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      align-items: stretch;
      background: var(--primary);
      border-radius: 0 var(--radius) var(--radius) 0;
      margin-bottom: 24px;
      overflow: hidden;
      min-height: 64px;

      &__back {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        background: rgba(255,255,255,0.15);
        color: white;
        border: none;
        border-right: 1px solid rgba(255,255,255,0.2);
        cursor: pointer;
        transition: background var(--transition);
        flex-shrink: 0;
        &:hover { background: rgba(255,255,255,0.25); }
      }

      &__content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 28px;
        color: white;
      }

      &__icon {
        display: flex;
        align-items: center;
        opacity: 0.9;
        ::ng-deep svg { width: 24px; height: 24px; stroke: white; }
      }

      &__title {
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: white;
      }
    }
  `]
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() icon = '';
  @Input() backPath?: string;
}

