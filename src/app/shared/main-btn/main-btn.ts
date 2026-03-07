import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'main-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-btn.html',
  styleUrl: './main-btn.scss'
})
export class MainBtn {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'primary' | 'danger' | 'success' = 'primary';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
}
