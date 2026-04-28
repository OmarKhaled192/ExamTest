import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../../../shared/breadcrumb/breadcrumb';
import { PageHeaderComponent } from '../../../../shared/page-header/page-header';
import { MainBtn } from '../../../../shared/main-btn/main-btn';
import { ModalComponent } from '../../../../shared/modal/modal';
import { UsersService } from '../../../../core/services/users.service';
import { Router } from '@angular/router';
import { User } from '../../../../core/models/user.model';
import { TokenService } from '../../../../core/services/token.service';

type Tab = 'profile' | 'password';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent, PageHeaderComponent, ModalComponent, MainBtn],
  templateUrl: './account.html',
  styleUrls: ['./account.scss']
})
export class AccountPage {

  breadcrumbs = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Account' }
  ];

  headerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>`;

  activeTab = signal<Tab>('profile');
  deleteModalOpen = signal(false);
  changeEmailModalOpen = signal(false);
  changeEmailStep = signal<'enter-email' | 'verify-otp'>('enter-email');

  pwError = signal('');
  pwSuccess = signal(false);
  saving = signal(false);
  showCurrent = signal(false);
  showNew = signal(false);
  showConfirm = signal(false);

  profile = {
    firstName: 'Ahmed',
    lastName: 'Abdullah',
    username: 'user123',
    email: 'user@example.com',
    phone: '1012345678',
    countryCode: 'EG(+20)'
  };

  passwords = { current: '', newPw: '', confirm: '' };
  changeEmailData = { email: '', otp: ['', '', '', '', '', ''] };
  countryCodes = ['EG(+20)', 'US(+1)', 'UK(+44)', 'AE(+971)', 'SA Saudi Arabia(+966)'];

  timer = signal(60);
  private timerInterval: any;

  private readonly _usersService = inject(UsersService);
  private readonly _router = inject(Router);
  private readonly _tokenService = inject(TokenService);

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this._usersService.getProfile().subscribe({
      next: (res: any) => {
        const countryCodeMatch = this.countryCodes.find(c => {
          const code = c.split('(')[1].split(')')[0];
          return res.user.phone.startsWith(code);
        });

        let phone = res.user.phone;
        let countryCode = 'EG(+20)';
        if (countryCodeMatch) {
          countryCode = countryCodeMatch;
          const code = countryCodeMatch.split('(')[1].split(')')[0];
          phone = res.user.phone.replace(code, '');
        }

        this.profile = {
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          username: res.user.username,
          email: res.user.email,
          phone: phone,
          countryCode: countryCode
        };
      },
      error: (err) => console.error('Error loading profile:', err)
    });
  }

  setTab(t: Tab) {
    this.activeTab.set(t);
  }

  saveProfile() {
    this.saving.set(true);
    const code = this.profile.countryCode.split('(')[1].split(')')[0];
    const fullPhone = code + this.profile.phone;

    this._usersService.updateProfile({
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      phone: fullPhone
    }).subscribe({
      next: (user) => {
        this.saving.set(false);
        this.pwSuccess.set(true); // Reuse success toast for profile update
        setTimeout(() => this.pwSuccess.set(false), 3500);
      },
      error: (err) => {
        this.saving.set(false);
        console.error('Error updating profile:', err);
      }
    });
  }

  updatePassword() {
    if (!this.passwords.current || !this.passwords.newPw || !this.passwords.confirm) {
      this.pwError.set('Please fill all fields.');
      return;
    }
    if (this.passwords.newPw !== this.passwords.confirm) {
      this.pwError.set('Passwords do not match.');
      return;
    }

    this.pwError.set('');
    this._usersService.changePassword({
      currentPassword: this.passwords.current,
      newPassword: this.passwords.newPw,
      confirmPassword: this.passwords.confirm
    }).subscribe({
      next: () => {
        this.pwSuccess.set(true);
        this.passwords = { current: '', newPw: '', confirm: '' };
        setTimeout(() => this.pwSuccess.set(false), 3500);
      },
      error: (err) => {
        this.pwError.set(err.error?.message || 'Error updating password.');
      }
    });
  }

  confirmDelete() {
    this._usersService.deleteAccount().subscribe({
      next: () => {
        this.deleteModalOpen.set(false);
        this._tokenService.removeToken();
        this._router.navigate(['/auth/login']);
      },
      error: (err) => console.error('Error deleting account:', err)
    });
  }

  changeEmail() {
    this.changeEmailStep.set('enter-email');
    this.changeEmailData = { email: '', otp: ['', '', '', '', '', ''] };
    this.changeEmailModalOpen.set(true);
    this.stopTimer();
  }

  nextChangeEmailStep() {
    if (this.changeEmailData.email) {
      this._usersService.requestEmailChange({ newEmail: this.changeEmailData.email }).subscribe({
        next: () => {
          this.changeEmailStep.set('verify-otp');
          this.startTimer();
        },
        error: (err) => console.error('Error requesting email change:', err)
      });
    }
  }

  startTimer() {
    this.stopTimer();
    this.timer.set(60);

    this.timerInterval = setInterval(() => {
      if (this.timer() > 0) {
        this.timer.update(v => v - 1);
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  closeEmailModal() {
    this.changeEmailModalOpen.set(false);
    this.stopTimer();
  }

  verifyEmailCode() {
    const code = this.changeEmailData.otp.join('');
    this._usersService.confirmEmailChange({ code }).subscribe({
      next: (res) => {
        this.profile.email = res.user.email;
        this.closeEmailModal();
      },
      error: (err) => console.error('Error confirming email change:', err)
    });
  }

  editEmail() {
    this.changeEmailStep.set('enter-email');
    this.stopTimer();
  }

  trackByFn(index: number) {
    return index;
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    input.value = value;

    this.changeEmailData.otp[index] = value;

    if (value && index < 5) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prevInput = input.previousElementSibling as HTMLInputElement;
      prevInput?.focus();
      this.changeEmailData.otp[index - 1] = '';
    }
  }

  logout() {
    this._tokenService.removeToken();
    this._router.navigate(['/auth/login']);
  }
}