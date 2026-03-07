import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'question-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './question-link.html',
  styleUrl: './question-link.scss'
})
export class QuestionLink {
  @Input() question = '';
  @Input() link = '/';
  @Input() linkLabel = '';
}
