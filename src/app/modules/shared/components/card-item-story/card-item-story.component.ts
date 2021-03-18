import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Story } from 'src/app/modules/core/interfaces/story/story.interface';

import * as storyActions from 'src/app/modules/core/store/actions/story.action';
import * as storySelectors from 'src/app/modules/core/store/selectors/story.selector';
import { ESizeThumbnail } from 'src/app/modules/shared/utils/size-thumbnail.enum';

@Component({
  selector: 'app-card-item-story',
  templateUrl: './card-item-story.component.html',
  styleUrls: ['./card-item-story.component.scss'],
})
export class CardItemStoryComponent implements OnInit {
  @Input() story!: Story;
  bookmark!: boolean;
  mapSubscription = new Subject();

  size: string = ESizeThumbnail.standard_xlarge;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(storySelectors.getIdsBookmarks)
      .pipe(takeUntil(this.mapSubscription))
      .subscribe((ids) => {
        this.bookmark = ids.some((id) => this.story.id === id);
      });
  }

  onSelectComic() {
    this.router.navigate(['stories', this.story.id]);
  }

  addRemoveBookmark() {
    this.bookmark
      ? this.store.dispatch(
          storyActions.removeStoryBookmark({
            id: Number(this.story.id),
          })
        )
      : this.store.dispatch(
          storyActions.addStoryBookmark({ id: Number(this.story.id) })
        );
  }

  get iconBookmarkState() {
    return this.bookmark ? 'accent' : null;
  }

  bookmarkComic() {
    this.bookmark
      ? this.store.dispatch(
          storyActions.removeStoryBookmark({
            id: Number(this.story.id),
          })
        )
      : this.store.dispatch(
          storyActions.addStoryBookmark({ id: Number(this.story.id) })
        );
  }

  ngOnDestroy(): void {
    this.mapSubscription.next();
    this.mapSubscription.complete();
    this.mapSubscription.unsubscribe();
  }
}
