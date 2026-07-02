import { Directive, TemplateRef, ViewContainerRef, inject, input, effect } from '@angular/core';
import { SessionService } from '../../core/application/services/session.service';

@Directive({ selector: '[hmsHasRole]', standalone: true })
export class HasRoleDirective {
  private readonly template = inject(TemplateRef<unknown>);
  private readonly vc = inject(ViewContainerRef);
  private readonly session = inject(SessionService);

  readonly hmsHasRole = input<string | string[]>('');

  constructor() {
    effect(() => {
      const roles = this.hmsHasRole();
      const required = Array.isArray(roles) ? roles : [roles];
      const user = this.session.getUserContext();

      const has = required.some(
        (r) => user?.roles?.includes(r)
      );

      this.vc.clear();

      if (has) {
        this.vc.createEmbeddedView(this.template);
      }
    });
  }
}
