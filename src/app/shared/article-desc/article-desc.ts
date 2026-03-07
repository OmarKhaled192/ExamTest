import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'article-desc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-desc.html',
  styleUrl: './article-desc.scss'
})
export class ArticleDesc {

  @Input() iconPath!: string;
  @Input() title!: string;
  @Input() description!: string;

}