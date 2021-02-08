import { ToggleSearchService } from './../services/toggle-search.service';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appToggleSearch]',
})
export class ToggleSearchDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(
    private elmentRef: ElementRef,
    private toggleSearchService: ToggleSearchService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.toggleSearchService.clickSub.subscribe(() => {
      this.isOpen = true;
    });
  }

  @HostListener('click', ['$event']) toggleOpen(event: Event) {
    if (this.isOpen) {
      this.isOpen = this.elmentRef.nativeElement.firstChild.contains(
        event.target
      )
        ? true
        : false;
    }

    console.log(this.isOpen);
  }
}
