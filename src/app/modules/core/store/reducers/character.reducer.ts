import { characterAdapter, ICharacterState } from './../state/character.state';
import { createReducer, on, Action } from '@ngrx/store';

import { initialCharacterState } from '../state/character.state';
import * as characterAction from '../actions/character.action';

const _characterReducer = createReducer(
  initialCharacterState,
  on(characterAction.getCharacters, (state) => ({ ...state, offset: 20 })),
  on(characterAction.getCharactersSuccess, (state, { characters }) => {
    return { ...characterAdapter.upsertMany(characters, state) };
  }),
  on(characterAction.characterSelected, (state, { id }) => ({
    ...state,
    selectedCharacterId: id,
  })),
  on(characterAction.characterSelectedSuccess, (state, { character }) => {
    return characterAdapter.upsertOne(character, state);
  }),
  on(
    characterAction.getMoreCharactersSuccess,
    (state, { characters, offset }) => {
      return {
        ...characterAdapter.addMany(characters, state),
        offset: offset + 20,
      };
    }
  )
);

export function characterReducer(
  state: ICharacterState | undefined,
  action: Action
) {
  return _characterReducer(state, action);
}
