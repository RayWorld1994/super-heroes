import { CharacterService } from './../../../characters/services/character.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  map,
  catchError,
  exhaustMap,
  concatMap,
  withLatestFrom,
  tap,
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
          withLatestFrom(this.store.select(characterSeletors.getOffset))
        )
      ),
      exhaustMap(([_, offset]) =>
        this.characterService.getMoreCharacters(offset).pipe(
          tap(value => console.log(value)),
          map((data) =>
            characterAction.getMoreCharactersSuccess({
              characters: data.results,
              offset: +data.offset,
            })
          )
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
