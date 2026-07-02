import { Directive, ElementRef, inject, AfterViewInit, input } from '@angular/core';

@Directive({ selector: '[hmsAutofocus]', standalone: true })
export class AutofocusDirective implements AfterViewInit {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly hmsAutofocus = input(true);

  ngAfterViewInit(): void {
    if (this.hmsAutofocus()) {
      setTimeout(() => this.el.nativeElement.focus(), 50);
    }
  }
}
