import {
  Component, signal, ViewChild, ElementRef, ViewChildren,
  QueryList, OnDestroy, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';

const OTP_DEADLINE_KEY = 'register_otp_deadline';
const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MainBtn, QuestionLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnDestroy {

  // ── stepper ──────────────────────────────────────────────────────────────
  steps = [1, 2, 3, 4];
  currentStep = 1;

  // ── fields ───────────────────────────────────────────────────────────────
  firstName = ''; lastName = ''; username = '';
  email = ''; phone = '';
  password = ''; confirmPassword = '';
  showPassword = false; showConfirm = false;
  selectedCountry = '+20';

  // ── OTP ──────────────────────────────────────────────────────────────────
  otpBoxes = Array(OTP_LENGTH).fill(0);
  otpValues: string[] = Array(OTP_LENGTH).fill('');
  resendCountdown = 0;
  private _countdownInterval: ReturnType<typeof setInterval> | null = null;

  @ViewChild('emailInput') emailInputRef!: ElementRef<HTMLInputElement>;
  @ViewChildren('otpInput') otpInputRefs!: QueryList<ElementRef<HTMLInputElement>>;

  // ── Step 1 → Step 2 ──────────────────────────────────────────────────────
  goToOtp(): void {
    if (!this.email) return;
    this.currentStep = 2;
    this._startCountdown();
    // focus first OTP box after view updates
    setTimeout(() => this._focusOtp(0), 50);
  }

  // ── OTP countdown (persisted via localStorage) ───────────────────────────
  private _startCountdown(): void {
    // Persist deadline so timer survives navigation away & back
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

  private _clearCountdownInterval(): void {
    if (this._countdownInterval !== null) {
      clearInterval(this._countdownInterval);
      this._countdownInterval = null;
    }
  }

  /** Resume persisted countdown when component re-enters step 2 */
  private _resumeCountdownIfActive(): void {
    const stored = localStorage.getItem(OTP_DEADLINE_KEY);
    if (!stored) return;
    const deadline = Number(stored);
    if (deadline > Date.now()) {
      this._tickCountdown(deadline);
    } else {
      this.resendCountdown = 0;
    }
  }

  resendOtp(): void {
    // Re-trigger OTP send logic here
    console.log('Resend OTP to', this.email);
    this._startCountdown();
  }

  // ── Edit email → back to step 1, focus email field ───────────────────────
  editEmail(): void {
    this._clearCountdownInterval();
    this.currentStep = 1;
    setTimeout(() => this.emailInputRef?.nativeElement.focus(), 50);
  }

  // ── OTP box handlers ─────────────────────────────────────────────────────
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

  // ── Step 2 → Step 3 ──────────────────────────────────────────────────────
  verifyOtp(): void {
    if (!this.otpComplete) return;
    const code = this.otpValues.join('');
    console.log('Verify OTP:', code);
    this._clearCountdownInterval();
    localStorage.removeItem(OTP_DEADLINE_KEY);
    this.currentStep = 3;
  }

  // ── Step 3 → Step 4 ──────────────────────────────────────────────────────
  goToPassword(): void {
    if (!this.firstName || !this.lastName || !this.username) return;
    this.currentStep = 4;
  }

  // ── Step 4: Submit ────────────────────────────────────────────────────────
  onRegister(): void {
    if (!this.password || this.password !== this.confirmPassword) return;
    console.log('Register submitted', {
      email: this.email, firstName: this.firstName,
      lastName: this.lastName, username: this.username,
      phone: `${this.selectedCountry}${this.phone}`
    });
  }

  ngOnDestroy(): void {
    this._clearCountdownInterval();
  }
}
