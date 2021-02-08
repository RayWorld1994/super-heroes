import { EOrderBy } from './../../utils/eorder-by.enum';
import { characterAdapter, ICharacterState } from './../state/character.state';
import { createReducer, on, Action } from '@ngrx/store';

import { initialCharacterState } from '../state/character.state';
import * as characterAction from '../actions/character.action';

const _characterReducer = createReducer(
  initialCharacterState,
  on(characterAction.getCharacters, (state) => ({
    ...state,
    offset: 20,
    filter: { ...state.filter, orderBy: EOrderBy.OrderAtoZ, byName: '' },
  })),
  on(characterAction.getCharactersSuccess, (state, { characters }) => {
    return characterAdapter.upsertMany(characters, state);
  }),
  on(characterAction.characterSelected, (state, { id }) => ({
    ...state,
    selectedCharacterId: id,
  })),
  on(characterAction.characterSelectedSuccess, (state, { character }) => {
    return characterAdapter.upsertOne(character, state);
  }),
  on(characterAction.getMoreCharacters, (state) => ({
    ...state,
    offset: state.offset + 20,
  })),
  on(
    characterAction.getMoreCharactersSuccess,
    (state, { characters, offset }) => {
      return {
        ...characterAdapter.addMany(characters, state),
        offset: offset,
      };
    }
  ),
  on(characterAction.filterByOrder, (state) => {
    const orderBy =
      state.filter.orderBy === EOrderBy.OrderAtoZ
        ? EOrderBy.OrderZtoA
        : EOrderBy.OrderAtoZ;
    return { ...state, offset: 20, filter: { ...state.filter, orderBy } };
  }),
  on(characterAction.searchCharacter, (state, { searchName }) => ({
    ...state,
    offset: 20,
    filter: { ...state.filter, byName: searchName },
  }))
);

export function characterReducer(
  state: ICharacterState | undefined,
  action: Action
) {
  return _characterReducer(state, action);
}
