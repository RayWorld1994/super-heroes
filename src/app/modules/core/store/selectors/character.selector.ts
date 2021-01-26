import { characterAdapter, ICharacterState } from './../state/character.state';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EOrderBy } from '../../utils/eorder-by.enum';

export const selectFeatureCharacter = createFeatureSelector<ICharacterState>(
  'characterState'
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = characterAdapter.getSelectors();

export const getCharactersIds = createSelector(
  selectFeatureCharacter,
  selectIds
);
export const getCharactersEntities = createSelector(
  selectFeatureCharacter,
  selectEntities
);
export const getAllCharacters = createSelector(
  selectFeatureCharacter,
  selectAll
);
export const getCharacterTotal = createSelector(
  selectFeatureCharacter,
  selectTotal
);
export const getCurrentCharacterId = createSelector(
  selectFeatureCharacter,
  (state) => state.selectedCharacterId
);
export const getCurrentCharacter = createSelector(
  getCharactersEntities,
  getCurrentCharacterId,
  (characterEntities, characterId) => {
    return characterId ? characterEntities[characterId] : undefined;
  }
);
export const getlistByCharacter = createSelector(
  getCurrentCharacter,
  (character) => {
    return [
      { type: 'series', list: character?.series },
      { type: 'comics', list: character?.comics },
      { type: 'events', list: character?.events },
      { type: 'stories', list: character?.stories },
    ];
  }
);
export const getOffset = createSelector(
  selectFeatureCharacter,
  (state) => state.offset
);
export const charactersSort = createSelector(
  selectFeatureCharacter,
  getAllCharacters,
  (state, characters) => {
    switch (state.orderBy) {
      case EOrderBy.OrderAtoZ:
        return characters.sort((a, b) =>
          a.name == b.name ? 0 : a.name > b.name ? 1 : -1
        );
      case EOrderBy.OrderZtoA:
        return characters.sort((a, b) =>
          a.name == b.name ? 0 : a.name < b.name ? 1 : -1
        );
      default:
        return characters;
    }
  }
);

export const getCharacterOnScreen = createSelector(
  charactersSort,
  getOffset,
  (characters, offset) => characters?.slice(0, offset)
);
