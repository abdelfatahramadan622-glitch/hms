import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentsFacade } from '../../../application/facades/appointments.facade';
import { LayoutService } from '../../../../../core/application/services/layout.service';

@Component({
  selector: 'hms-appointment-calendar-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './appointment-calendar-page.component.html',
  styleUrl: './appointment-calendar-page.component.scss',
})
export class AppointmentCalendarPageComponent implements OnInit {
  readonly facade = inject(AppointmentsFacade);
  private readonly layout = inject(LayoutService);

  readonly currentDate = signal(new Date());

  readonly calendarDays = computed(() => {
    const date = this.currentDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  });

  readonly monthYearLabel = computed(() => {
    return this.currentDate().toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' });
  });

  ngOnInit(): void {
    this.layout.setPageTitle('Appointment Calendar', 'تقويم المواعيد');
    this.loadCurrentMonth();
  }

  loadCurrentMonth(): void {
    const d = this.currentDate();
    const dateFrom = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0];
    const dateTo = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0];
    this.facade.loadAll({ page: 1, pageSize: 200, dateFrom, dateTo });
  }

  prevMonth(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    this.loadCurrentMonth();
  }

  nextMonth(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    this.loadCurrentMonth();
  }

  getAppointmentsForDay(day: number): any[] {
    if (!day) return [];
    const d = this.currentDate();
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return this.facade.appointments().items.filter((a) => a.date === dateStr).slice(0, 3);
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const d = this.currentDate();
    const today = new Date();
    return d.getFullYear() === today.getFullYear()
      && d.getMonth() === today.getMonth()
      && day === today.getDate();
  }

  readonly weekDays = ['أح', 'اث', 'ث', 'أر', 'خ', 'ج', 'س'];
}