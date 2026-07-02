import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-3">
      @if (label()) {
        <label class="form-label fw-semibold small">
          {{ label() }}
          @if (required()) { <span class="text-danger ms-1">*</span> }
        </label>
      }
      <ng-content />
      @if (hint()) {
        <div class="form-text text-muted">{{ hint() }}</div>
      }
      @if (error()) {
        <div class="invalid-feedback d-block small">{{ error() }}</div>
      }
    </div>
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

    .form-label {
      color: #1f2937;
      margin-bottom: 6px;
    }
  `]
})
export class FormFieldComponent {
  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly error = input<string>('');
  readonly required = input<boolean>(false);
}