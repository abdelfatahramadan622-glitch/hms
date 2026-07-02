import { Injectable } from '@angular/core';
import { Subject, Observable, filter } from 'rxjs';
import { RealtimeEvent, RealtimeEventType } from './realtime-events';

@Injectable({ providedIn: 'root' })
export class RealtimeEventBusService {
  private readonly events$ = new Subject<RealtimeEvent>();

  publish<T>(event: RealtimeEvent<T>): void {
    this.events$.next(event as RealtimeEvent);
  }

  on<T = unknown>(type: RealtimeEventType): Observable<RealtimeEvent<T>> {
    return this.events$.pipe(
      filter((e) => e.type === type)
    ) as Observable<RealtimeEvent<T>>;
  }

  all(): Observable<RealtimeEvent> {
    return this.events$.asObservable();
  }
}
