import { Injectable, ErrorHandler, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class ErrorLoggerService implements ErrorHandler {
  private readonly logger = inject(LoggerService);

  handleError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      this.logger.error(
        `HTTP Error ${error.status}: ${error.message}`,
        'ErrorLogger',
        { url: error.url, status: error.status, body: error.error }
      );
      return;
    }

    if (error instanceof Error) {
      this.logger.error(error.message, 'ErrorLogger', {
        name: error.name,
        stack: error.stack,
      });
      return;
    }

    this.logger.error('Unknown error occurred', 'ErrorLogger', error);
  }
}