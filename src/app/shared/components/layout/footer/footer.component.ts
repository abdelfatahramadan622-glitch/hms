import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="border-top bg-white py-3 px-4">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 small text-muted">
        <span>&copy; {{ year }} نظام إدارة المستشفى — جميع الحقوق محفوظة</span>
        <span dir="ltr">HMS v1.0.0</span>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }

    footer {
      border-top-color: #dcfce7 !important;
    }

    footer span:first-child {
      color: #374151;
    }

    footer span:last-child {
      color: #16a34a;
      font-weight: 600;
      font-size: 0.75rem;
      background: #f0fdf4;
      padding: 2px 10px;
      border-radius: 6px;
    }
  `]
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}