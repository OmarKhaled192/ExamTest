import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'main-btn',
  imports: [CommonModule],
  templateUrl: './main-btn.html',
  styleUrl: './main-btn.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainBtn {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() color: 'primary' | 'danger' | 'success' = 'primary';

  @Input() icon: string | null = null;

  @Input() iconPosition: 'left' | 'right' = 'left';
}
