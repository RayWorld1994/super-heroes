import { characterAdapter, ICharacterState } from './../state/character.state';
import { createReducer, on, Action } from '@ngrx/store';

import { initialCharacterState } from '../state/character.state';
import * as characterAction from '../actions/character.action';

const _characterReducer = createReducer(
  initialCharacterState,
  on(characterAction.getCharactersSuccess, (state, { characters }) => {
    return characterAdapter.setAll(characters, state);
  })
);

export function characterReducer(
  state: ICharacterState | undefined,
  action: Action
) {
  return _characterReducer(state, action);
}
