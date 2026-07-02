import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="file-upload">
      <div
        class="border-2 rounded-3 p-4 text-center"
        [class.border-primary]="isDragging()"
        [class.bg-primary-subtle]="isDragging()"
        [class.border-dashed]="!selectedFile()"
        style="border-style: dashed; cursor: pointer;"
        (dragover)="onDragOver($event)"
        (dragleave)="isDragging.set(false)"
        (drop)="onDrop($event)">

        @if (selectedFile()) {
          <i class="bi bi-file-earmark-check text-success fs-2 d-block mb-2"></i>
          <div class="fw-semibold small">{{ selectedFile()!.name }}</div>
          <div class="text-muted" style="font-size:0.75rem;">
            {{ formatSize(selectedFile()!.size) }}
          </div>
          <label class="btn btn-sm btn-outline-secondary mt-2">
            تغيير الملف
            <input type="file" class="d-none" [accept]="accept()" (change)="onFileChange($event)" />
          </label>
        } @else {
          <i class="bi bi-cloud-upload text-muted fs-2 d-block mb-2"></i>
          <p class="text-muted small mb-2">اسحب وأفلت الملف هنا أو</p>
          <label class="btn btn-sm btn-outline-primary">
            اختيار ملف
            <input type="file" class="d-none" [accept]="accept()" (change)="onFileChange($event)" />
          </label>
          @if (hint()) {
            <p class="text-muted mt-2 mb-0" style="font-size:0.72rem;">{{ hint() }}</p>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .file-upload {
      animation: fadeUp 0.4s ease-out;
    }

    .file-upload .border-2 {
      border-color: #bbf7d0 !important;
      border-radius: 12px !important;
      transition: all 0.3s ease;
      background-color: #f0fdf4;
    }

    .file-upload .border-2:hover {
      border-color: #22c55e !important;
      background-color: #dcfce7;
    }

    .file-upload .border-primary {
      border-color: #22c55e !important;
      background-color: #dcfce7 !important;
    }

    .file-upload .bg-primary-subtle {
      background-color: #dcfce7 !important;
    }

    .file-upload .btn-outline-primary {
      color: #15803d;
      border-color: #22c55e;
      border-radius: 8px;
      transition: all 0.25s ease;
    }

    .file-upload .btn-outline-primary:hover {
      background-color: #15803d;
      border-color: #15803d;
      color: #fff;
    }

    .file-upload .btn-outline-secondary {
      border-radius: 8px;
      transition: all 0.25s ease;
    }

    .file-upload .text-success {
      color: #16a34a !important;
    }
  `]
})
export class FileUploadComponent {
  readonly accept = input<string>('*/*');
  readonly hint = input<string>('');
  readonly maxSizeMB = input<number>(10);
  readonly fileSelected = output<File>();

  readonly selectedFile = signal<File | null>(null);
  readonly isDragging = signal(false);

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.selectFile(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) this.selectFile(file);
  }

  private selectFile(file: File): void {
    this.selectedFile.set(file);
    this.fileSelected.emit(file);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  clear(): void { this.selectedFile.set(null); }
}