import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-title',
  imports: [],
  templateUrl: './main-title.html',
  styleUrl: './main-title.scss',
})
export class MainTitle {
  @Input() withPadding = true;
}
