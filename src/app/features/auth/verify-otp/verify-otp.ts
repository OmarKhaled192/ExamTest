import { Component, Input, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef, NgZone } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, MainBtn, QuestionLink],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss'
})
export class VerifyOtp implements OnInit, OnDestroy {
  @Input() email = 'user@example.com';
  @ViewChildren('box') boxes!: QueryList<ElementRef<HTMLInputElement>>;

  otp: string[] = ['', '', '', '', '', ''];
  countdown = 60;
  private timer: any;

  constructor(private location: Location, private zone: NgZone) { }

  ngOnInit() {
    // Run timer OUTSIDE Angular zone to avoid triggering change detection every second
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
          // Re-enter zone only to update the view
          this.zone.run(() => { });
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    });
  }

  ngOnDestroy() { clearInterval(this.timer); }

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
    if (code.length < 6) return;
    console.log('OTP submitted:', code);
  }

  onEdit() { this.location.back(); }
  resend() { this.countdown = 60; }
  goBack() { this.location.back(); }
}