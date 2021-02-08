import { createAction, props } from '@ngrx/store';
import { Comic } from '../../interfaces/comic/comic.interface';

export enum EComicActions {
  GetComics = '[Comic Page] Get Comics',
  GetComicsSuccess = '[Comic Page] Get Comics Success',
  comicSelected = '[Comic Page] Get Comic',
  comicSelectedSuccess = '[Comic Page] Get Comic Success',
  getMoreComics = '[Comic Page] Get More Comics',
  getMoreComicsSuccess = '[Comic Page] Get More Comics Success',
  getComicsSortedByIssue = '[Comic Page] Get Comic Sorted ',
  getComicsSortedByTitle = '[Comic Page] Get Comic Sorted ',
}

export const getComics = createAction(EComicActions.GetComics);
export const getComicsSuccess = createAction(
  EComicActions.GetComicsSuccess,
  props<{ comics: Comic[] }>()
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
  props<{ comics: Comic[]; offset: number }>()
);
export const sortByIssueNumber = createAction(
  EComicActions.getComicsSortedByIssue
)
export const sortByTitle = createAction(
  EComicActions.getComicsSortedByTitle
)
