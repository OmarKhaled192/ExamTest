import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.scss']
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() icon = '';
  @Input() backPath?: string;
}

