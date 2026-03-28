import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  NgZone,
  inject
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';
import { AuthService } from '../../../../../dist/auth';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, MainBtn, QuestionLink],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss'
})
export class VerifyOtp implements OnInit, OnDestroy {

  @Input() email!: string;

  @ViewChildren('otpInputs')
  boxes!: QueryList<ElementRef<HTMLInputElement>>;

  otp: string[] = ['', '', '', '', '', ''];
  countdown = 60;
  private timer: any;

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  location = inject(Location);
  zone = inject(NgZone)
  authService = inject(AuthService)


  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  startTimer() {
    clearInterval(this.timer);

    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
          this.zone.run(() => { });
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    });
  }

  onKey(event: KeyboardEvent, i: number) {
    const input = event.target as HTMLInputElement;
    const boxArray = this.boxes.toArray();

    if (event.key === 'Backspace') {
      this.otp[i] = '';
      if (i > 0) boxArray[i - 1].nativeElement.focus();
      return;
    }

    if (!/^\d$/.test(input.value)) {
      this.otp[i] = '';
      return;
    }

    if (i < 5) boxArray[i + 1].nativeElement.focus();
  }

  onVerify() {
    const code = this.otp.join('');

    if (code.length < 6) {
      this.errorMessage = 'Please enter complete code';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.confirmEmailVerification({
      email: this.email,
      code: code
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = res.message || 'Verification successful';

        // this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.message || 'Invalid or expired code';
      }
    });
  }

  resend() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.sendEmailVerification({
      email: this.email
    }).subscribe({
      next: (res) => {
        this.successMessage = res.message || 'Code resent successfully';

        this.countdown = 60;
        this.startTimer();
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message || 'Failed to resend code';
      }
    });
  }

  onEdit() {
    this.location.back();
  }

  goBack() {
    this.location.back();
  }
}
