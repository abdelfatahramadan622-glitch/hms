import { Directive, TemplateRef, ViewContainerRef, inject, input, effect } from '@angular/core';
import { SessionService } from '../../core/application/services/session.service';

@Directive({ selector: '[hmsHasPermission]', standalone: true })
export class HasPermissionDirective {
  private readonly template = inject(TemplateRef<unknown>);
  private readonly vc = inject(ViewContainerRef);
  private readonly session = inject(SessionService);

  readonly hmsHasPermission = input<string | string[]>('');

  constructor() {
    effect(() => {
      const perms = this.hmsHasPermission();
      const required = Array.isArray(perms) ? perms : [perms];
      const user = this.session.getUserContext();

      const has = required.every(
        (p) => user?.permissions?.includes(p)
      );

      this.vc.clear();

      if (has) {
        this.vc.createEmbeddedView(this.template);
      }
    });
  }
}
