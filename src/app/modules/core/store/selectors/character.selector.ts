import { characterAdapter, ICharacterState } from './../state/character.state';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Character } from '../../interfaces/character/character.interface';

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
    return characterEntities[characterId];
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
  (state) => state.scrolling.offset
);

export const getFilter = createSelector(
  selectFeatureCharacter,
  (state) => state.filterOption
);

export const getOrderCharacter = createSelector(
  getFilter,
  (filter) => filter.orderBy
);
export const getIdsBookmarks = createSelector(
  selectFeatureCharacter,
  ({ bookmarks }) => bookmarks
);
export const getCharactersBookmarks = createSelector(
  getIdsBookmarks,
  getCharactersEntities,
  (ids, entities) => ids.map((id) => entities[id] as Character)
);

export const getIsFiltered = createSelector(
  selectFeatureCharacter,
  ({ isFiltered }) => isFiltered
);

export const getCharacterHashIds = createSelector(
  selectFeatureCharacter,
  (state) => state.characterListId
);

export const getCharacterOnScreen = createSelector(
  getCharactersEntities,
  getCharacterHashIds,
  (entities, ids) =>
    ids.map((id) => {
      return entities[id] as Character;
    })
);
