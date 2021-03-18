import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Story } from 'src/app/modules/core/interfaces/story/story.interface';
import { ESizeThumbnail } from 'src/app/modules/shared/utils/size-thumbnail.enum';

import * as storySelectors from 'src/app/modules/core/store/selectors/story.selector';
import * as storyActions from 'src/app/modules/core/store/actions/story.action';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit {
  size = ESizeThumbnail.detail;
  story: Story | undefined;
  bookmark = false;
  mapSubscription = new Subject();

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.store.dispatch(
        storyActions.storySelected({ id: Number(params.get('id_story')) })
      );
    });

    this.getStory();
  }

  getStory() {
    this.store
      .select(storySelectors.getCurrentStorie)
      .pipe(
        tap((story) => {
          this.story = story;
        }),
        concatMap(() => this.store.select(storySelectors.getIdsBookmarks))
      )
      .pipe(takeUntil(this.mapSubscription))
      .subscribe((ids) => {
        this.bookmark = ids.some((id) => this.story?.id === id);
      });
  }

  addRemoveBookmark() {
    this.bookmark
      ? this.store.dispatch(
          storyActions.removeStoryBookmark({
            id: Number(this.story?.id),
          })
        )
      : this.store.dispatch(
          storyActions.addStoryBookmark({
            id: Number(this.story?.id),
          })
        );
  }

  get iconBookmarkState() {
    return this.bookmark ? 'accent' : null;
  }

  ngOnDestroy(): void {
    this.mapSubscription.next();
    this.mapSubscription.complete();
    this.mapSubscription.unsubscribe();
  }
}
