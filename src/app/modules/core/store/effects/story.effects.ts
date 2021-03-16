import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import {
  exhaustMap,
  map,
  mergeMap,
  catchError,
  concatMap,
  withLatestFrom,
} from 'rxjs/operators';
import { StoryService } from 'src/app/modules/stories/services/story.service';
import * as storyActions from '../actions/story.action';
import * as storySelectors from '../selectors/story.selector';

@Injectable()
export class StoryEffects {
  getStories = createEffect(() =>
    this.action$.pipe(
      ofType(storyActions.getStories),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(storySelectors.getOrderStory))
        )
      ),
      mergeMap(([_, orderBy]) =>
        this.storyService.getstories({ orderBy }).pipe(
          map((data) => {
            const { results, ...scrolling } = data;
            const ids = results.map((story) => story.id);
            return storyActions.getStoriesSuccess({
              stories: results,
              ids,
              scrolling,
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getStory$ = createEffect(() =>
    this.action$.pipe(
      ofType(storyActions.storySelected),
      exhaustMap((action) =>
        this.storyService.getstory(action.id).pipe(
          map((data) =>
            storyActions.storySelectedSuccess({
              story: data.results[0],
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getMoreStories = createEffect(() =>
    this.action$.pipe(
      ofType(storyActions.getMoreStories),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(storySelectors.getOffset),
            this.store.select(storySelectors.getFilterOption)
          )
        )
      ),
      exhaustMap(([_, offset, filterOption]) =>
        this.storyService
          .getstories({
            offset: offset.toString(),
            modifiedSince: filterOption.modifiedSince?.toDateString(),
            orderBy: filterOption.orderBy,
          })
          .pipe(
            map((data) => {
              const { results, offset } = data;
              const ids = results.map((story) => story.id);
              return storyActions.getMoreStoriesSuccess({
                stories: results,
                ids,
                offset,
              });
            }),
            catchError(() => EMPTY)
          )
      )
    )
  );

  filterStories$ = createEffect(() =>
    this.action$.pipe(
      ofType(storyActions.filterStories),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(storySelectors.getFilterOption))
        )
      ),
      mergeMap(([_, filterOption]) => {
        return this.storyService
          .getstories({
            modifiedSince: filterOption.modifiedSince?.toDateString(),
            orderBy: filterOption.orderBy,
          })
          .pipe(
            map((data) => {
              const { results, ...scrolling } = data;
              const ids = results.map((story) => story.id);
              return storyActions.getStoriesSuccess({
                stories: results,
                scrolling,
                ids,
              });
            })
          );
      })
    )
  );

  constructor(
    private action$: Actions,
    private storyService: StoryService,
    private store: Store
  ) {}
}
