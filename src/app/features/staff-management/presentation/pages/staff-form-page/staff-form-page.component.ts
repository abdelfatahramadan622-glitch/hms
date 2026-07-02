import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hms-staff-form-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: scale(0.97) translateY(12px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    :host {
      display: block;
      animation: fadeUp 0.5s ease-out;
    }
    .fa-user-plus { color: #15803d !important; }
    .card {
      border-radius: 14px;
      animation: cardIn 0.45s ease-out both;
    }
  `],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="h4 fw-bold mb-0">
        <i class="fa-solid fa-user-plus me-2 text-success"></i>إضافة / تعديل موظف
      </h1>
    </div>
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5">
        <i class="fa-solid fa-user-plus fs-1 text-success d-block mb-3"></i>
        <h5 class="fw-bold text-muted mb-2">نموذج الموظف</h5>
        <p class="text-muted small mb-0">هذه الصفحة قيد التطوير</p>
      </div>
    </div>
  `,
})
export class StaffFormPageComponent {}