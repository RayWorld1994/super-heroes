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
  (state) => state.offset
);
export const getOrderCharacter = createSelector(
  selectFeatureCharacter,
  (state) => state.filter.orderBy
);

export const getSeachName = createSelector(
  selectFeatureCharacter,
  (state) => state.filter.byName
);

export const searchByName = createSelector(
  getSeachName,
  getAllCharacters,
  (name, characters) => {
    console.log('Search Selector');
    console.log(
      characters.filter((character) =>
        character.name.toLowerCase().startsWith(name.toLowerCase())
      )
    );
    return name
      ? characters.filter((character) => character.name.startsWith(name))
      : characters;
  }
);

export const charactersSort = createSelector(
  selectFeatureCharacter,
  searchByName,
  (state, characters) => {
    switch (state.filter.orderBy) {
      case EOrderBy.OrderAtoZ:
        return characters.sort((a, b) =>
          a.name == b.name ? 0 : a.name > b.name ? 1 : -1
        );
      case EOrderBy.OrderZtoA:
        const l = characters.sort((a, b) =>
          a.name == b.name ? 0 : a.name < b.name ? 1 : -1
        );
        return l;
      default:
        return characters;
    }
  }
);

export const getCharacterOnScreen = createSelector(
  charactersSort,
  getOffset,
  getOrderCharacter,
  (characters, offset) => {
    return [...characters]?.slice(0, offset);
  }
);
