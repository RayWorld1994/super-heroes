import { ICharacterState } from './../state/character.state';
import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

export const selectFeatureCharacter = (state: IAppState) =>
  state.characterState;

export const getCharacters = createSelector(
  selectFeatureCharacter,
  (state: ICharacterState) => state.characters
);
