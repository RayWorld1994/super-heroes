import { InfiniteScroolling } from './../../interfaces/scrolling.interface';
import { Character } from './../../interfaces/character/character.interface';
import { createAction, props } from '@ngrx/store';
import { FilterCharacter } from '../../interfaces/filter.character';

export enum ECharacterActions {
  GetCharacters = '[Character Page] Get Characters',
  GetCharactersSuccess = '[Character Page] Get Characters Success',
  characterSelected = '[Character Page] Get Character',
  characterSelectedSuccess = '[Character Page] Get Character Success',
  getMoreCharacters = '[Character Page] Get More Characters',
  getMoreCharactersSuccess = '[Character Page] Get More Characters Success',
  getCharactersSorted = '[Character Page] Get Characters Sorted ',
  getCharactersSearched = '[Character Page] Get Characters Searched',
  getCharactersFiltered = '[Character Page] Get characters Filtered',
  getCharactersFilteredSuccess = '[Character Page] Get Character Filtered Success',
  cancelFilterCharacter = '[Character Page] Cancel Filter Characters',
  addCharacterToBookmark = '[Character Page] Add Character to Bookmark List',
  removeCharacterToBookmark = '[Character Page] Remove Character to Bookmark List',
}

export const getCharacters = createAction(ECharacterActions.GetCharacters);
export const getCharactersSuccess = createAction(
  ECharacterActions.GetCharactersSuccess,
  props<{
    characters: Character[];
    scrolling: InfiniteScroolling;
    ids: number[];
  }>()
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
  props<{ characters: Character[]; offset: number; ids: number[] }>()
);
export const filterByOrder = createAction(
  ECharacterActions.getCharactersSorted
);
export const searchCharacter = createAction(
  ECharacterActions.getCharactersSearched,
  props<{ searchName: string }>()
);
export const filterCharacters = createAction(
  ECharacterActions.getCharactersFiltered,
  props<{ filter: FilterCharacter }>()
);
export const cancelFilterCharacter = createAction(
  ECharacterActions.cancelFilterCharacter
);
export const addCharacterBookmark = createAction(
  ECharacterActions.addCharacterToBookmark,
  props<{ id: number }>()
);
export const removeCharacterBookmark = createAction(
  ECharacterActions.removeCharacterToBookmark,
  props<{ id: number }>()
);
