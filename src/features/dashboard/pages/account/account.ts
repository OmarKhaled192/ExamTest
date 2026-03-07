import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { MainBtn } from '../../../../shared/components/main-btn/main-btn';
import { ModalComponent } from '../../../../shared/components/modal/modal';

type Tab = 'profile' | 'password';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent, PageHeaderComponent, MainBtn, ModalComponent],
  templateUrl: './account.html',
  styleUrl: './account.scss'
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
  passwordError = signal('');
  passwordSuccess = signal(false);
  savingProfile = signal(false);

  // Password visibility
  showCurrentPw = signal(false);
  showNewPw = signal(false);
  showConfirmPw = signal(false);

  profile = {
    firstName: 'Ahmed',
    lastName: 'Abdullah',
    username: 'user123',
    email: 'user@example.com',
    phone: '1012345678',
    countryCode: 'EG(+20)'
  };

  passwords = {
    current: '',
    new: '',
    confirm: ''
  };

  countryCodes = ['EG(+20)', 'US(+1)', 'UK(+44)', 'AE(+971)', 'SA(+966)'];

  setTab(tab: Tab) { this.activeTab.set(tab); }

  saveProfile() {
    this.savingProfile.set(true);
    setTimeout(() => this.savingProfile.set(false), 1500);
  }

  updatePassword() {
    if (!this.passwords.current || !this.passwords.new || !this.passwords.confirm) {
      this.passwordError.set('Please fill all fields.');
      return;
    }
    if (this.passwords.new !== this.passwords.confirm) {
      this.passwordError.set('Passwords do not match.');
      return;
    }
    this.passwordError.set('');
    this.passwordSuccess.set(true);
    setTimeout(() => this.passwordSuccess.set(false), 3000);
    this.passwords = { current: '', new: '', confirm: '' };
  }

  confirmDelete() {
    this.deleteModalOpen.set(false);
    console.log('Account deleted');
  }

  logout() {
    console.log('Logged out');
  }

  eyeIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>`;

  eyeOffIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>`;
}

