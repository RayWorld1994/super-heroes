import { trigger, transition, style, animate } from '@angular/animations';
export const SlideInOut = trigger('filter', [
  transition(':enter', [
    style({ height: 0 }),
    animate('200ms ease-out', style({ height: '*' })),
  ]),
  transition(':leave', [
    style({ height: '*' }),
    animate('200ms ease-in-out', style({ height: 0 })),
  ]),
]);
