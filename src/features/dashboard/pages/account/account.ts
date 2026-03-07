import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../../../app/shared/breadcrumb/breadcrumb';
import { PageHeaderComponent } from '../../../../app/shared/page-header/page-header';
import { MainBtn } from '../../../../app/shared/main-btn/main-btn';
import { ModalComponent } from '../../../../app/shared/modal/modal';

type Tab = 'profile' | 'password';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent, PageHeaderComponent, MainBtn, ModalComponent],
  templateUrl: './account.html',
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
  pwError = signal('');
  pwSuccess = signal(false);
  saving = signal(false);
  showCurrent = signal(false);
  showNew = signal(false);
  showConfirm = signal(false);

  profile = { firstName: 'Ahmed', lastName: 'Abdullah', username: 'user123', email: 'user@example.com', phone: '1012345678', countryCode: 'EG(+20)' };
  passwords = { current: '', newPw: '', confirm: '' };
  countryCodes = ['EG(+20)', 'US(+1)', 'UK(+44)', 'AE(+971)', 'SA(+966)'];

  setTab(t: Tab) { this.activeTab.set(t); }

  saveProfile() {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 1500);
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
    this.pwSuccess.set(true);
    this.passwords = { current: '', newPw: '', confirm: '' };
    setTimeout(() => this.pwSuccess.set(false), 3500);
  }

  confirmDelete() {
    this.deleteModalOpen.set(false);
    console.log('Account deleted');
  }

  logout() { console.log('Logout'); }
}

