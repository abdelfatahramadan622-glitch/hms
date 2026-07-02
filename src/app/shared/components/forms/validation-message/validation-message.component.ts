import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'hms-validation-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (control() && control()!.invalid && control()!.touched) {
      <div class="invalid-feedback d-block small">
        @if (control()!.errors?.['required']) { {{ requiredMsg() }} }
        @else if (control()!.errors?.['email']) { بريد إلكتروني غير صحيح }
        @else if (control()!.errors?.['minlength']) {
          الحد الأدنى {{ control()!.errors?.['minlength']?.requiredLength }} أحرف
        }
        @else if (control()!.errors?.['maxlength']) {
          الحد الأقصى {{ control()!.errors?.['maxlength']?.requiredLength }} أحرف
        }
        @else if (control()!.errors?.['min']) {
          القيمة الدنيا {{ control()!.errors?.['min']?.min }}
        }
        @else if (control()!.errors?.['max']) {
          القيمة القصوى {{ control()!.errors?.['max']?.max }}
        }
        @else if (control()!.errors?.['pattern']) { تنسيق غير صحيح }
        @else if (customMessage()) { {{ customMessage() }} }
      </div>
    }
  `,
  styles: [`
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }

    :host {
      display: block;
    }

    .invalid-feedback.d-block {
      background: #fef2f2;
      color: #dc2626;
      padding: 8px 14px;
      border-radius: 10px;
      margin-top: 6px;
      font-size: 0.8rem;
      border: none;
      animation: shake 0.4s ease-in-out;
    }
  `]
})
export class ValidationMessageComponent {
  readonly control = input<AbstractControl | null>(null);
  readonly requiredMsg = input<string>('هذا الحقل مطلوب');
  readonly customMessage = input<string>('');
}