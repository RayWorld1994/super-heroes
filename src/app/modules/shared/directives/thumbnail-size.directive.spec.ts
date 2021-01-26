import { ElementRef } from '@angular/core';
import { ThumbnailSizeDirective } from './thumbnail-size.directive';

describe('ThumbnailSizeDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef(HTMLDivElement);
    const directive = new ThumbnailSizeDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
