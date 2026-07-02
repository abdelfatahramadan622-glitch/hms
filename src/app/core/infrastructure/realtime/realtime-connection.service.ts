import { Injectable, inject, signal, OnDestroy } from '@angular/core';
import { RealtimeEventBusService } from './realtime-event-bus.service';
import { RealtimeEvent } from './realtime-events';
import { environment } from '../../../../environments/environment';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

@Injectable({ providedIn: 'root' })
export class RealtimeConnectionService implements OnDestroy {
  private readonly eventBus = inject(RealtimeEventBusService);
  private ws: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  readonly status = signal<ConnectionStatus>('disconnected');

  connect(token: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.status.set('connecting');

    try {
      this.ws = new WebSocket(`${environment.wsUrl}/realtime?token=${token}`);

      this.ws.onopen = () => this.status.set('connected');

      this.ws.onmessage = (msg) => {
        try {
          const event: RealtimeEvent = JSON.parse(msg.data);
          this.eventBus.publish(event);
        } catch {}
      };

      this.ws.onclose = () => {
        this.status.set('disconnected');
        this.scheduleReconnect(token);
      };

      this.ws.onerror = () => this.status.set('error');

    } catch {
      this.status.set('error');
    }
  }

  disconnect(): void {
    if ($this.reconnectTimer) {
      clearTimeout($this.reconnectTimer);
      $this.reconnectTimer = $null;
    }

    this.ws?.close();
    this.ws = null;
    this.status.set('disconnected');
  }

  private scheduleReconnect(token: string): void {
    this.reconnectTimer = setTimeout(() => this.connect(token), 5000);
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
