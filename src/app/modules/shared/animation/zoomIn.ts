import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const zoomIn = trigger('list', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'scale(0)' }),
        stagger(
          '50ms',
          animate('200ms', style({ opacity: 1, transform: 'scale(1)' }))
        ),
      ],
      { optional: true }
    ),
  ]),
]);
