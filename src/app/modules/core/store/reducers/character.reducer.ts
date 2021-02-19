import { EOrderBy } from './../../utils/eorder-by.enum';
import { characterAdapter, ICharacterState } from './../state/character.state';
import { createReducer, on, Action } from '@ngrx/store';

import { initialCharacterState } from '../state/character.state';
import * as characterAction from '../actions/character.action';

const _characterReducer = createReducer(
  initialCharacterState,
  on(characterAction.getCharacters, (state) => ({
    ...state,
    scrolling: { ...state.scrolling, offset: 0 },
    filter: {
      ...state.filterOption,
      orderBy: EOrderBy.OrderAtoZ,
      byName: '',
      byComic: '',
      byStory: '',
    },
  })),
  on(
    characterAction.getCharactersSuccess,
    (state, { characters, scrolling, ids }) => {
      return {
        ...characterAdapter.upsertMany(characters, state),
        scrolling: {
          ...state.scrolling,
          total: scrolling.total,
          limit: scrolling.limit,
        },
        characterListId: ids,
      };
    }
  ),
  on(characterAction.characterSelected, (state, { id }) => ({
    ...state,
    selectedCharacterId: id,
  })),
  on(characterAction.characterSelectedSuccess, (state, { character }) => {
    return characterAdapter.upsertOne(character, state);
  }),
  on(characterAction.getMoreCharacters, (state) => {
    const offset =
      state.scrolling.offset + 20 > state.scrolling.total
        ? state.scrolling.total
        : state.scrolling.offset + 20;
    return {
      ...state,
      scrolling: { ...state.scrolling, offset },
    };
  }),
  on(characterAction.getMoreCharactersSuccess, (state, { characters, ids }) => {
    return {
      ...characterAdapter.addMany(characters, state),
      scrolling: { ...state.scrolling },
      characterListId: [...state.characterListId, ...ids],
    };
  }),
  on(characterAction.filterByOrder, (state) => {
    const orderBy =
      state.filterOption.orderBy === EOrderBy.OrderAtoZ
        ? EOrderBy.OrderZtoA
        : EOrderBy.OrderAtoZ;
    return {
      ...state,
      scrolling: { ...state.scrolling, offset: 0 },
      filterOption: { ...state.filterOption, orderBy },
    };
  }),
  on(characterAction.searchCharacter, (state, { searchName }) => ({
    ...state,
    scrolling: { ...state.scrolling, offset: 0 },
    filterOption: { ...state.filterOption, byName: searchName },
  })),
  on(characterAction.filterCharacters, (state, { filter }) => ({
    ...state,
    scrolling: { ...state.scrolling, offset: 0 },
    filterOption: {
      ...state.filterOption,
      byName: filter.byName,
      byComic: filter.byComic,
      byStory: filter.byStory,
    },
    isFiltered: true,
  })),
  on(characterAction.cancelFilter, (state) => ({
    ...state,
    filterOption: { byComic: '', byName: '', byStory: '' },
    isFiltered: false,
  }))
);

export function characterReducer(
  state: ICharacterState | undefined,
  action: Action
) {
  return _characterReducer(state, action);
}
