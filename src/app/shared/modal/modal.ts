import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="background: rgba(15,23,42,0.45); backdrop-filter: blur(3px);"
      (click)="close.emit()"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-[fadeUp_0.22s_cubic-bezier(0.34,1.56,0.64,1)]"
        (click)="$event.stopPropagation()"
      >
        <!-- Close X -->
        <button
          (click)="close.emit()"
          class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px) scale(0.97); }
      to   { opacity: 1; transform: none; }
    }
  `],
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
}

