import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
})
export class ScrollToTopComponent implements OnInit {
  @Input() elementRef!: ElementRef;

  constructor(private scrollDispatcher: ScrollDispatcher) {}

  ngOnInit(): void {}

  upToTop() {
    this.scrollDispatcher
      .getAncestorScrollContainers(this.elementRef)[0]
      .scrollTo({ top: 0, behavior: 'smooth' });
  }
}
