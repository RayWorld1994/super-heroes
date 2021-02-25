import { cancelFilterCharacter } from './character.action';
import { createAction, props } from '@ngrx/store';
import { Comic } from '../../interfaces/comic/comic.interface';
import { InfiniteScroolling } from '../../interfaces/scrolling.interface';

export enum EComicActions {
  GetComics = '[Comic Page] Get Comics',
  GetComicsSuccess = '[Comic Page] Get Comics Success',
  comicSelected = '[Comic Page] Get Comic',
  comicSelectedSuccess = '[Comic Page] Get Comic Success',
  getMoreComics = '[Comic Page] Get More Comics',
  getMoreComicsSuccess = '[Comic Page] Get More Comics Success',
  getComicsSortedByIssue = '[Comic Page] Get Comic Sorted ',
  getComicsFilteredByTitle = '[Comic Page] Get Comic Filtered by Title ',
  getComicsFilteredByFormat = '[Comic Page] Get Comic Sorted Filtered by Format',
  getComicsFilteredByIssue = '[Comic Page] Get Comic Filtered by Issue ',
  cancelFilterComic = '[Comic Page] Cancel Filter Comics',
  addComicToBookmark = '[Comic Page] Add Comic to Bookmark',
  removeComicToBookmark = '[Comic Page] Add Comic to Bookmark',
}

export const getComics = createAction(EComicActions.GetComics);
export const getComicsSuccess = createAction(
  EComicActions.GetComicsSuccess,
  props<{ comics: Comic[]; scrolling: InfiniteScroolling; ids: number[] }>()
);
export const comicSelected = createAction(
  EComicActions.comicSelected,
  props<{ id: number }>()
);
export const comicSelectedSuccess = createAction(
  EComicActions.comicSelectedSuccess,
  props<{ comic: Comic }>()
);
export const getMoreComics = createAction(EComicActions.getMoreComics);
export const getMoreComicsSuccess = createAction(
  EComicActions.getMoreComicsSuccess,
  props<{ comics: Comic[]; offset: number; ids: number }>()
);
export const sortByIssueNumber = createAction(
  EComicActions.getComicsSortedByIssue
);
export const filterByTitle = createAction(
  EComicActions.getComicsFilteredByTitle
);
export const filterByFormat = createAction(
  EComicActions.getComicsFilteredByFormat
);
export const filterByIssue = createAction(
  EComicActions.getComicsFilteredByIssue
);
export const cancelFilterComic = createAction(EComicActions.cancelFilterComic);
export const addCharacterBookmark = createAction(
  EComicActions.addComicToBookmark,
  props<{ id: number }>()
);
export const removeComicBookmark = createAction(
  EComicActions.removeComicToBookmark,
  props<{ id: number }>()
);
