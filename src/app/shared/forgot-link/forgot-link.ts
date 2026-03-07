import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'forgot-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './forgot-link.html',
  styleUrl: './forgot-link.scss'
})
export class ForgotLink {
  @Input() label = 'Forgot your password?';
  @Input() link = '/forgot-password';
}
