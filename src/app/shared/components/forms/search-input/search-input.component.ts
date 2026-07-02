import { Component, input, output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hms-search-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="input-group" [class.input-group-sm]="size() === 'sm'">
      <span class="input-group-text bg-light border-end-0">
        <i class="bi bi-search text-muted"></i>
      </span>
      <input
        type="search"
        class="form-control border-start-0"
        [placeholder]="placeholder()"
        [formControl]="control"
      />
      @if (control.value) {
        <button type="button" class="input-group-text bg-light border-start-0 cursor-pointer"
          (click)="control.reset()">
          <i class="bi bi-x text-muted"></i>
        </button>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .input-group {
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid #e5e7eb;
    }

    .input-group:focus-within {
      border-color: #22c55e;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
    }

    .input-group .input-group-text {
      border: none;
      transition: color 0.3s ease;
    }

    .input-group:focus-within .input-group-text {
      color: #15803d;
    }

    .input-group .form-control {
      border: none;
      box-shadow: none !important;
    }

    .input-group .form-control:focus {
      box-shadow: none !important;
    }

    .input-group .cursor-pointer {
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .input-group .cursor-pointer:hover {
      color: #dc2626 !important;
    }
  `]
})
export class SearchInputComponent implements OnInit {
  readonly placeholder = input<string>('بحث...');
  readonly debounce = input<number>(400);
  readonly size = input<'sm' | 'md'>('md');
  readonly searchChanged = output<string>();

  readonly control = new FormControl('');

  ngOnInit(): void {
    this.control.valueChanges.pipe(
      debounceTime(this.debounce()),
      distinctUntilChanged()
    ).subscribe((v) => this.searchChanged.emit(v ?? ''));
  }

  setValue(v: string): void { this.control.setValue(v, { emitEvent: false }); }
  reset(): void { this.control.reset(); }
}