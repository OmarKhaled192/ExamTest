import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'main-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-btn.html',
})
export class MainBtn {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'primary' | 'danger' | 'success' | 'ghost' | 'outline' | 'primary-light' | 'light-danger' = 'primary';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fullWidth = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;

  get classes(): string {
    const base = 'inline-flex items-center justify-center gap-2 font-mono font-medium rounded transition-all duration-200 cursor-pointer border disabled:opacity-50 disabled:cursor-not-allowed';

    const sizes: Record<string, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-base',
    };

    const colors: Record<string, string> = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      'primary-light': 'bg-blue-50 text-dark border border-blue-600 hover:bg-blue-100',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      success: 'bg-green-500 text-white hover:bg-green-600',
      ghost: 'bg-red-50 text-red-500 hover:bg-red-100',
      outline: 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200',
      'light-danger': 'bg-red-50 text-red-500 border-red-100 hover:bg-red-100',
    };

    const width = this.fullWidth ? 'w-full' : '';
    return [base, sizes[this.size], colors[this.color], width].filter(Boolean).join(' ');
  }
}

