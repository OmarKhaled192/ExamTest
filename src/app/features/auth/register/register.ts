import { Component, OnDestroy, ViewChild, ViewChildren, ElementRef, QueryList, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';
import { AuthService } from '../../../../../dist/auth';

const OTP_DEADLINE_KEY = 'register_otp_deadline';
const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MainBtn, QuestionLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register implements OnDestroy {

  private authService = inject(AuthService);

  steps = [1, 2, 3, 4];
  currentStep = 1;

  showPassword = false;
  showConfirm = false;

  otpBoxes = Array(OTP_LENGTH).fill(0);
  otpValues: string[] = Array(OTP_LENGTH).fill('');
  resendCountdown = 0;
  private _countdownInterval: ReturnType<typeof setInterval> | null = null;

  @ViewChild('emailInput') emailInputRef!: ElementRef<HTMLInputElement>;
  @ViewChildren('otpInput') otpInputRefs!: QueryList<ElementRef<HTMLInputElement>>;

  // ── Reactive Forms ──────────────────────────────────────────────
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  otpForm = new FormGroup({}); // we’ll track otpValues separately

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    selectedCountry: new FormControl('+20'),
    phone: new FormControl('')
  });

  passwordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  // ── Step 1 → Step 2 ─────────────────────────────────────────────
  goToOtp(): void {
    if (this.emailForm.invalid) return;

    const email = this.emailForm.value.email!;
    this.authService.sendEmailVerification({ email }).subscribe({
      next: () => {
        this.currentStep = 2;
        this._startCountdown();
        setTimeout(() => this._focusOtp(0), 50);
      },
      error: (err) => alert('Failed to send OTP: ' + err)
    });
  }

  // ── Step 2: OTP ───────────────────────────────────────────────
  verifyOtp(): void {
    if (!this.otpComplete) return;
    const email = this.emailForm.value.email!;
    const code = this.otpValues.join('');

    this.authService.confirmEmailVerification({ email, code }).subscribe({
      next: () => {
        this._clearCountdownInterval();
        localStorage.removeItem(OTP_DEADLINE_KEY);
        this.currentStep = 3;
      },
      error: () => alert('Invalid OTP')
    });
  }

  // ── Step 3 → Step 4 ─────────────────────────────────────────────
  goToPassword(): void {
    if (this.profileForm.invalid) return;
    this.currentStep = 4;
  }

  // ── Step 4: Submit ─────────────────────────────────────────────
  onRegister(): void {
    if (this.passwordForm.invalid) return;

    const { password, confirmPassword } = this.passwordForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      email: this.emailForm.value.email!,
      firstName: this.profileForm.value.firstName!,
      lastName: this.profileForm.value.lastName!,
      username: this.profileForm.value.username!,
      // phone: `${this.profileForm.value.selectedCountry}${this.profileForm.value.phone || ''}`,
      phone: `${this.profileForm.value.phone || ''}`,
      password: password!,
      confirmPassword: confirmPassword!
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        // alert(`Welcome ${res.user.firstName}!`);
        console.log('Registered:', res);
      },
      error: (err) => alert('Registration failed: ' + err)
    });
  }

  // ── Edit email ─────────────────────────────────────────────────
  editEmail(): void {
    this._clearCountdownInterval();
    this.currentStep = 1;
    setTimeout(() => this.emailInputRef?.nativeElement.focus(), 50);
  }

  // ── OTP helpers ───────────────────────────────────────────────
  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '').slice(-1);
    this.otpValues[index] = val;
    input.value = val;
    if (val && index < OTP_LENGTH - 1) this._focusOtp(index + 1);
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.otpValues[index] && index > 0) {
      this._focusOtp(index - 1);
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    const pasted = event.clipboardData?.getData('text') ?? '';
    const digits = pasted.replace(/\D/g, '').slice(0, OTP_LENGTH);
    digits.split('').forEach((d, i) => { this.otpValues[i] = d; });
    event.preventDefault();
    this._focusOtp(Math.min(digits.length, OTP_LENGTH - 1));
  }

  private _focusOtp(index: number): void {
    const inputs = this.otpInputRefs?.toArray();
    inputs?.[index]?.nativeElement.focus();
  }

  get otpComplete(): boolean {
    return this.otpValues.every(v => v !== '');
  }

  // ── OTP countdown ─────────────────────────────────────────────
  private _startCountdown(): void {
    const deadline = Date.now() + RESEND_SECONDS * 1000;
    localStorage.setItem(OTP_DEADLINE_KEY, String(deadline));
    this._tickCountdown(deadline);
  }

  private _tickCountdown(deadline: number): void {
    this._clearCountdownInterval();
    const tick = () => {
      const remaining = Math.ceil((deadline - Date.now()) / 1000);
      this.resendCountdown = Math.max(remaining, 0);
      if (this.resendCountdown === 0) this._clearCountdownInterval();
    };
    tick();
    this._countdownInterval = setInterval(tick, 1000);
  }

  resendOtp(): void {
    const email = this.emailForm.value.email!;
    this.authService.sendEmailVerification({ email }).subscribe(() => this._startCountdown());
  }

  private _clearCountdownInterval(): void {
    if (this._countdownInterval !== null) {
      clearInterval(this._countdownInterval);
      this._countdownInterval = null;
    }
  }

  ngOnDestroy(): void {
    this._clearCountdownInterval();
  }
}
