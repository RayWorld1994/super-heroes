import { Character } from './../../interfaces/character/character.interface';
import { createAction, props } from '@ngrx/store';

export enum ECharacterActions {
  GetCharacters = '[Character Page] Get Characters',
  GetCharactersSuccess = '[Character Page] Get Characters Success',
  characterSelected = '[Character Page] Get Character',
  characterSelectedSuccess = '[Character Page] Get Character Success',
  getMoreCharacters = '[Character Page] Get More Characters',
  getMoreCharactersSuccess = '[Character Page] Get More Characters Success',
}

export const getCharacters = createAction(ECharacterActions.GetCharacters);
export const getCharactersSuccess = createAction(
  ECharacterActions.GetCharactersSuccess,
  props<{ characters: Character[] }>()
);
export const characterSelected = createAction(
  ECharacterActions.characterSelected,
  props<{ id: number }>()
);
export const characterSelectedSuccess = createAction(
  ECharacterActions.characterSelectedSuccess,
  props<{ character: Character }>()
);
export const getMoreCharacters = createAction(
  ECharacterActions.getMoreCharacters
);
export const getMoreCharactersSuccess = createAction(
  ECharacterActions.getMoreCharactersSuccess,
  props<{ characters: Character[]; offset: number }>()
);
