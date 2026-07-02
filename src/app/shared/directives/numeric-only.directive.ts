import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[hmsNumericOnly]', standalone: true })
export class NumericOnlyDirective {

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {
    return /[0-9.]/.test(event.key);
  }

}
