import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LabResultsFacade } from '../../../application/facades/lab-results.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';
import { NavigationService } from '../../../../../core/application/services/navigation.service';

@Component({
  selector: 'hms-lab-result-upload-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './lab-result-upload-page.component.html',
  styleUrl: './lab-result-upload-page.component.scss',
})
export class LabResultUploadPageComponent {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(LabResultsFacade);
  private readonly layout = inject(LayoutService);
  private readonly nav = inject(NavigationService);

  selectedFile = signal<File | null>(null);
  uploadSuccess = signal(false);

  form = this.fb.group({
    resultId: ['', Validators.required],
  });

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.selectedFile.set(file);
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedFile()) return;
    const resultId = this.form.value.resultId!;
    this.facade.upload(resultId, this.selectedFile()!).subscribe({
      next: (r) => {
        this.uploadSuccess.set(true);
        setTimeout(() => this.nav.goTo(`/lab-results/${r.id}`), 1500);
      },
    });
  }
}