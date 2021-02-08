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
      tap((action) => console.log(action)),
      ofType(characterAction.getCharacters, characterAction.filterByOrder),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(characterSeletors.getOrderCharacter))
        )
      ),
      mergeMap(([_, order]) =>
        this.characterService.getCharacters(order).pipe(
          map((data) =>
            characterAction.getCharactersSuccess({ characters: data.results })
          ),
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
            this.store.select(characterSeletors.getOrderCharacter)
          )
        )
      ),
      exhaustMap(([_, offset, order]) =>
        this.characterService.getMoreCharacters(offset, order).pipe(
          map((data) =>
            characterAction.getMoreCharactersSuccess({
              characters: data.results,
              offset: +data.offset,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  searchCharacterByName$ = createEffect(() =>
    this.action$.pipe(
      ofType(characterAction.searchCharacter),
      tap((action) => console.log(action)),
      concatMap((action) =>
        this.characterService.filterCharacterByName(action.searchName).pipe(
          map((data) =>
            characterAction.getCharactersSuccess({
              characters: data.results,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
  // sortCharacter$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(characterAction.filterByOrder),
  //     concatMap(action => of(action).pipe(withLatestFrom(this.store.select(characterSeletors.getOrderCharacter))))
  //     switchMap(() =>
  //       this.characterService
  //         .getCharacters()
  //         .pipe(
  //           map((data) =>
  //             characterAction.filterByOrderSucess({ characters: data.results })
  //           )
  //         )
  //     )
  //   )
  // );

  constructor(
    private action$: Actions,
    private characterService: CharacterService,
    private store: Store
  ) {}
}
