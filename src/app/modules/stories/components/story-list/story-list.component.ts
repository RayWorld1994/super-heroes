import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Story } from './../../../core/interfaces/story/story.interface';
import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as storySelectors from 'src/app/modules/core/store/selectors/story.selector';
import * as storyActions from 'src/app/modules/core/store/actions/story.action';
import { Observable, Subject } from 'rxjs';
import { faSortDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';
import { zoomIn } from 'src/app/modules/shared/animation/zoomIn';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss'],
  animations: [zoomIn],
})
export class StoryListComponent implements OnInit {
  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  stories: Observable<Story[]> = this.store.select(
    storySelectors.getStorieOnScreen
  );
  mapSubscription = new Subject();
  icon: IconDefinition = faSortDown;

  constructor(
    private store: Store,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    this.store.dispatch(storyActions.getStories());
    this.scrollEvent();
  }

  scrollEvent() {
    return this.scrollDispatcher
      .scrolled()
      .pipe(takeUntil(this.mapSubscription))
      .subscribe((cdkScroll) => {
        if (cdkScroll) {
          const target = cdkScroll.getElementRef().nativeElement;
          if (target.scrollTop + target.clientHeight === target.scrollHeight) {
            this.store.dispatch(storyActions.getMoreStories());
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.mapSubscription.next();
    this.mapSubscription.complete();
    this.mapSubscription.unsubscribe();
  }
}
