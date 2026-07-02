import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordAttachment } from '../../../domain/models/medical-record.model';

@Component({
  selector: 'hms-attachments-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attachments-panel.component.html',
  styleUrl: './attachments-panel.component.scss',
})
export class AttachmentsPanelComponent {
  readonly attachments = input<RecordAttachment[]>([]);
  readonly isUploading = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly fileSelected = output<File>();
  readonly removed = output<string>();

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.fileSelected.emit(file);
  }

  getFileIcon(type: string): string {
    if (type.includes('pdf')) return 'bi-file-earmark-pdf text-danger';
    if (type.includes('image')) return 'bi-file-earmark-image text-primary';
    if (type.includes('word') || type.includes('document')) return 'bi-file-earmark-word text-info';
    return 'bi-file-earmark text-secondary';
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}