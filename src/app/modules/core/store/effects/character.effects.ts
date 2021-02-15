import { CharacterService } from './../../../characters/services/character.service';
import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  map,
  catchError,
  exhaustMap,
  concatMap,
  withLatestFrom,
  tap,
  switchMap,
} from 'rxjs/operators';
import * as characterAction from '../actions/character.action';
import * as characterSeletors from '../selectors/character.selector';
import { EMPTY, of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class CharacterEffect {
  getCharacters$ = createEffect(() =>
    this.action$.pipe(
      ofType(characterAction.getCharacters),
      mergeMap(() =>
        this.characterService.getCharacters().pipe(
          map((data) => {
            const ids = data.results.map((character) => character.id);
            return characterAction.getCharactersSuccess({
              characters: data.results,
              scrolling: {
                offset: data.offset,
                total: data.total,
                limit: data.limit,
              },
              ids,
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getCharacter$ = createEffect(() =>
    this.action$.pipe(
      ofType(characterAction.characterSelected),
      exhaustMap((action) =>
        this.characterService.getCharacter(action.id).pipe(
          map((data) =>
            characterAction.characterSelectedSuccess({
              character: data.results[0],
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getMoreCharacters$ = createEffect(() =>
    this.action$.pipe(
      ofType(characterAction.getMoreCharacters),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(characterSeletors.getOffset),
            this.store.select(characterSeletors.getFilter)
          )
        )
      ),
      concatMap(([_, offset, filter]) =>
        this.characterService
          .getCharacters({
            offset: offset + '',
            orderBy: filter.orderBy,
            nameStartsWith: filter.byName,
            comics: filter.byComic,
            stories: filter.byStory,
          })
          .pipe(
            map((data) => {
              const ids = data.results.map(({ id }) => id);
              return characterAction.getMoreCharactersSuccess({
                characters: data.results,
                offset: data.offset,
                ids,
              });
            }),
            catchError(() => EMPTY)
          )
      )
    )
  );

  searchCharacterByName$ = createEffect(() =>
    this.action$.pipe(
      ofType(characterAction.searchCharacter),
      concatMap((action) =>
        this.characterService
          .getCharacters({ nameStartsWith: action.searchName })
          .pipe(
            map((data) => {
              const ids = data.results.map(({ id }) => id);
              return characterAction.getCharactersSuccess({
                characters: data.results,
                scrolling: {
                  offset: data.offset,
                  limit: data.limit,
                  total: data.total,
                },
                ids,
              });
            }),
            catchError(() => EMPTY)
          )
      )
    )
  );

  filterCharacters$ = createEffect(() =>
    this.action$.pipe(
      ofType(characterAction.filterCharacters),
      exhaustMap((action) =>
        this.characterService
          .getCharacters({
            nameStartsWith: action.filter.byName,
            stories: action.filter.byStory,
            comics: action.filter.byComic,
          })
          .pipe(
            map((data) => {
              const ids = data.results.map(({ id }) => id);
              return characterAction.getCharactersSuccess({
                characters: data.results,
                scrolling: {
                  offset: data.offset,
                  limit: data.limit,
                  total: data.total,
                },
                ids,
              });
            }),
            catchError(() => EMPTY)
          )
      )
    )
  );

  sortCharacter$ = createEffect(() =>
    this.action$.pipe(
      ofType(characterAction.filterByOrder),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(characterSeletors.getFilter))
        )
      ),
      switchMap(([_, filter]) =>
        this.characterService
          .getCharacters({
            orderBy: filter.orderBy,
            nameStartsWith: filter.byName,
            stories: filter.byStory,
            comics: filter.byComic,
          })
          .pipe(
            tap((data) => console.log(data)),
            map((data) => {
              const ids = data.results.map(({ id }) => id);
              return characterAction.getCharactersSuccess({
                characters: data.results,
                scrolling: {
                  offset: data.offset,
                  limit: data.limit,
                  total: data.total,
                },
                ids,
              });
            })
          )
      )
    )
  );

  constructor(
    private action$: Actions,
    private characterService: CharacterService,
    private store: Store
  ) {}
}
