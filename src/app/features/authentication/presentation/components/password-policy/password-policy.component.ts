import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  evaluatePasswordStrength,
  PasswordStrength,
} from '../../../domain/models/password-reset.model';

@Component({
  selector: 'hms-password-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-policy.component.html',
  styleUrl: './password-policy.component.scss',
})
export class PasswordPolicyComponent {
  readonly password = input<string>('');

  readonly strength = computed<PasswordStrength>(() =>
    evaluatePasswordStrength(this.password())
  );

  readonly strengthWidths = ['0%', '25%', '50%', '75%', '100%'];

  get progressWidth(): string {
    return this.strengthWidths[this.strength().score];
  }
}