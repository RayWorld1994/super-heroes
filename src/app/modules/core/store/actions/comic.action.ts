import { cancelFilterCharacter } from './character.action';
import { createAction, props } from '@ngrx/store';
import { Comic } from '../../interfaces/comic/comic.interface';
import { InfiniteScroolling } from '../../interfaces/scrolling.interface';
import { FilterComic } from '../../interfaces/filter-comic.interface';

export enum EComicActions {
  GetComics = '[Comic Page] Get Comics',
  GetComicsSuccess = '[Comic Page] Get Comics Success',
  comicSelected = '[Comic Page] Get Comic',
  comicSelectedSuccess = '[Comic Page] Get Comic Success',
  getMoreComics = '[Comic Page] Get More Comics',
  getMoreComicsSuccess = '[Comic Page] Get More Comics Success',
  getComicsSortedByIssue = '[Comic Page] Get Comic Sorted ',
  getComicsFiltered = '[Comic Page] Get Comics Filtered',
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
  props<{ comics: Comic[]; offset: number; ids: number[] }>()
);
export const sortBy = createAction(
  EComicActions.getComicsSortedByIssue,
  props<{ orderBy: string }>()
);
export const filterComics = createAction(
  EComicActions.getComicsFiltered,
  props<{ filter: FilterComic }>()
);

export const cancelFilterComic = createAction(EComicActions.cancelFilterComic);
export const addComicBookmark = createAction(
  EComicActions.addComicToBookmark,
  props<{ id: number }>()
);
export const removeComicBookmark = createAction(
  EComicActions.removeComicToBookmark,
  props<{ id: number }>()
);
