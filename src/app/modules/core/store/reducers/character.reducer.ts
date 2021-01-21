import { ICharacterState } from './../state/character.state';
import { createReducer, on, Action } from '@ngrx/store';

import { initialCharacterState } from '../state/character.state';
import * as characterPageAction from '../actions/character.action';

const _characterReducer = createReducer(
  initialCharacterState,
  on(characterPageAction.getCharactersSuccess, (state, { characters }) => ({
    ...state,
    characters,
  }))
);

export function characterReducer(state: ICharacterState | undefined, action: Action) {
  return _characterReducer(state, action);
}
