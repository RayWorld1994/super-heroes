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
import { ComicService } from 'src/app/modules/comics/services/comic.service';
import * as comicActions from '../actions/comic.action';
import * as comicSelectors from '../selectors/comic.selector';

@Injectable()
export class ComicEffects {
  getComics = createEffect(() =>
    this.action$.pipe(
      ofType(comicActions.getComics),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(comicSelectors.getOrderComic))
        )
      ),
      mergeMap(([_, orderBy]) =>
        this.comicService.getcomics({ orderBy }).pipe(
          map((data) => {
            const { results, ...scrolling } = data;
            const ids = results.map((comic) => comic.id);
            return comicActions.getComicsSuccess({
              comics: results,
              ids,
              scrolling,
            });
          }),
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
            this.store.select(comicSelectors.getFilterOption)
          )
        )
      ),
      exhaustMap(([_, offset, filterOption]) =>
        this.comicService
          .getcomics({
            offset: offset.toString(),
            ...{
              ...filterOption,
              issueNumber: filterOption.issueNumber?.toString(),
            },
          })
          .pipe(
            map((data) => {
              const { results, offset } = data;
              const ids = results.map((comic) => comic.id);
              return comicActions.getMoreComicsSuccess({
                comics: results,
                ids,
                offset,
              });
            }),
            catchError(() => EMPTY)
          )
      )
    )
  );

  filterComics$ = createEffect(() =>
    this.action$.pipe(
      ofType(comicActions.filterComics),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(comicSelectors.getFilterOption))
        )
      ),
      mergeMap(([_, filterOption]) => {
        return this.comicService
          .getcomics({
            ...filterOption,
            issueNumber: filterOption.issueNumber?.toString(),
          })
          .pipe(
            map((data) => {
              const { results, ...scrolling } = data;
              const ids = results.map((comic) => comic.id);
              return comicActions.getComicsSuccess({
                comics: results,
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
    private comicService: ComicService,
    private store: Store
  ) {}
}
