import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appThumbnailSize]',
})
export class ThumbnailSizeDirective {
  @Input('appThumbnailSize') size: string = 'standard_xlarge';
  @Input() srcThumbnail: string | undefined;

  @HostBinding('attr.src') src!: string;
  @HostBinding('style.backgroundImage') backgroundImage!: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.divImg();
  }

  divImg() {
    const imageUrl = `${this.srcThumbnail}/${this.size}.jpg`;
    this.elementRef.nativeElement instanceof HTMLImageElement
      ? (this.src = imageUrl)
      : (this.backgroundImage = `url(${imageUrl}), url(assets/marvel-default.jpg)`);
  }

}
