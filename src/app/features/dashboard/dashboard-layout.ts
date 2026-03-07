import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../core/sidebar/sidebar';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="flex min-h-screen bg-[#f1f5f9]">
      <app-sidebar></app-sidebar>
      <main class="flex-1 min-w-0 overflow-auto">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class DashboardLayoutComponent { }

