import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  readonly type = input<'success' | 'danger' | 'warning' | 'info' | 'primary'>('info');
  readonly title = input<string>('');
  readonly message = input<string>('');
  readonly icon = input<string | null>(null);
  readonly dismissible = input<boolean>(false);
  readonly dismissed = output<void>();

  // Was a plain `{ set, value }` object before — but the template calls it
  // as `visible()`, which only works for a real WritableSignal. A plain
  // object called as a function throws "visible is not a function" at
  // render time.
  readonly visible = signal(true);

  onDismiss(): void {
    this.dismissed.emit();
    this.visible.set(false);
  }
}
