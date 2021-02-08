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
  tap,
} from 'rxjs/operators';
import { ComicService } from 'src/app/modules/comics/services/comic.service';
import * as comicActions from '../actions/comic.action';
import * as comicSelectors from '../selectors/comic.selector';

@Injectable()
export class ComicEffects {
  getComics = createEffect(() =>
    this.action$.pipe(
      ofType(comicActions.getComics, comicActions.sortByTitle),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(comicSelectors.getOrderBy))
        )
      ),
      mergeMap(([_, order]) =>
        this.comicService.getcomics(order).pipe(
          map((data) =>
            comicActions.getComicsSuccess({ comics: data.results })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getComic$ = createEffect(() =>
    this.action$.pipe(
      ofType(comicActions.comicSelected),
      exhaustMap((action) =>
        this.comicService.getcomic(action.id).pipe(
          map((data) =>
            comicActions.comicSelectedSuccess({
              comic: data.results[0],
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getMoreComics = createEffect(() =>
    this.action$.pipe(
      ofType(comicActions.getMoreComics),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(comicSelectors.getOffset),
            this.store.select(comicSelectors.getOrderBy)
          )
        )
      ),
      exhaustMap(([_, offset, order]) =>
        this.comicService.getMorecomics(offset, order).pipe(
          map((data) => {
            return comicActions.getMoreComicsSuccess({
              comics: data.results,
              offset: +data.offset,
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private comicService: ComicService,
    private store: Store
  ) {}
}
