import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DoctorsFacade } from '../../../application/facades/doctors.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';

@Component({
  selector: 'hms-doctor-schedule-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-schedule-page.component.html',
  styleUrl: './doctor-schedule-page.component.scss',
})
export class DoctorSchedulePageComponent implements OnInit {
  readonly facade = inject(DoctorsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly layout = inject(LayoutService);

  doctorId = '';
  selectedDate = signal(new Date().toISOString().split('T')[0]);

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('id')!;
    this.facade.loadById(this.doctorId);
    this.loadSchedule();
    this.layout.setPageTitle('Doctor Schedule', 'جدول الطبيب');
  }

  loadSchedule(): void {
    this.facade.loadSchedule(this.doctorId, this.selectedDate());
  }

  onDateChange(date: string): void {
    this.selectedDate.set(date);
    this.loadSchedule();
  }

  prevDay(): void {
    const d = new Date(this.selectedDate());
    d.setDate(d.getDate() - 1);
    this.onDateChange(d.toISOString().split('T')[0]);
  }

  nextDay(): void {
    const d = new Date(this.selectedDate());
    d.setDate(d.getDate() + 1);
    this.onDateChange(d.toISOString().split('T')[0]);
  }
}