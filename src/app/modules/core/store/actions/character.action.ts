import { createAction, props } from '@ngrx/store';
import { Character } from '../../interfaces/character/character.interface';

export const getCharacters = createAction('[Character Page] Get Characters');
export const getCharactersSuccess = createAction(
  '[Character Page] Get Characters Success',
  props<{ characters: Character[] }>()
);
