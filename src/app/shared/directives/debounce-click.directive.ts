import { Directive, output, HostListener, input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({ selector: '[hmsDebounceClick]', standalone: true })
export class DebounceClickDirective {
  readonly debounceTime = input(400);
  readonly debounceClick = output<MouseEvent>();

  private readonly clicks$ = new Subject<MouseEvent>();

  constructor() {
    this.clicks$
      .pipe(debounceTime(this.debounceTime()))
      .subscribe((e) => this.debounceClick.emit(e));
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.clicks$.next(event);
  }
}
