import { characterAdapter, ICharacterState } from './../state/character.state';
import { createSelector, createFeatureSelector } from '@ngrx/store';

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
    return characterId ? characterEntities[characterId] : null;
  }
);
