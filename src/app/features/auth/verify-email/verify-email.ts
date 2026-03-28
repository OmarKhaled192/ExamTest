import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { QuestionLink } from '../../../shared/question-link/question-link';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, QuestionLink],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss'
})
export class VerifyEmail {
  @Input() email = 'user@example.com';
  location = inject(Location)
  goBack() { this.location.back(); }
}
