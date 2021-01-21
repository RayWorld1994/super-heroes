import { Character } from './../../interfaces/character.interface';
import { createAction, props } from '@ngrx/store';

export const getCharacters = createAction('[Character Page] Get Characters');
export const getCharactersSuccess = createAction(
  '[Character Page] Get Characters Success',
  props<{ characters: Character[] }>()
);
