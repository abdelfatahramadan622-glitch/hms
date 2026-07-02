import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../core/application/services/layout.service';
import { ThemeService } from '../../core/application/services/theme.service';
import { AuthenticationFacade } from '../../features/authentication/application/facades/authentication.facade';

@Component({
  selector: 'hms-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  readonly layout = inject(LayoutService);
  readonly theme = inject(ThemeService);
  readonly auth = inject(AuthenticationFacade);

  onLogout(): void {
    this.auth.logout().subscribe();
  }
}