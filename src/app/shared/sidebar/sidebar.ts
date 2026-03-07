import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  collapsed = signal(false);
  userMenuOpen = signal(false);

  navItems: NavItem[] = [
    {
      label: 'Diplomas',
      path: '/dashboard/diplomas',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>`
    },
    {
      label: 'Account Settings',
      path: '/dashboard/account',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>`
    }
  ];

  user = {
    firstName: 'Firstname',
    email: 'user-email@example.com',
    avatar: null as string | null
  };

  toggleSidebar() {
    this.collapsed.update(v => !v);
    if (this.collapsed()) this.userMenuOpen.set(false);
  }

  toggleUserMenu(e: Event) {
    e.stopPropagation();
    this.userMenuOpen.update(v => !v);
  }

  closeUserMenu() {
    this.userMenuOpen.set(false);
  }

  logout() {
    console.log('Logout');
  }
}

