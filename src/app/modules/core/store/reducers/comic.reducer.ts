import { EOrderComicBy } from './../../utils/e-order-comic-by.enum';
import { Action, createReducer, on } from '@ngrx/store';
import {
  comicAdapter,
  IComicState,
  initialComicState,
} from './../state/comic.state';
import * as comicActions from '../actions/comic.action';

export const _comicReducer = createReducer(
  initialComicState,
  on(comicActions.getComics, (state) => ({
    ...state,
    scrolling: { ...state.scrolling, offset: 0 },
    filterOption: {
      ...state.filterOption,
      format: '',
      issueNumber: null,
      orderBy: '',
    },
  })),
  on(comicActions.getComicsSuccess, (state, { comics, ids, scrolling }) => {
    return {
      ...comicAdapter.upsertMany(comics, state),
      scrolling: { ...state.scrolling, ...scrolling },
      comicsListId: ids,
    };
  }),
  on(comicActions.comicSelected, (state, { id }) => ({
    ...state,
    selectedComicId: id,
  })),
  on(comicActions.comicSelectedSuccess, (state, { comic }) => {
    return comicAdapter.upsertOne(comic, state);
  }),
  on(comicActions.getMoreComics, (state) => {
    const offset =
      state.scrolling.offset + 20 > state.scrolling.total
        ? state.scrolling.total
        : state.scrolling.offset + 20;
    return {
      ...state,
      scrolling: { ...state.scrolling, offset },
    };
  }),
  on(comicActions.getMoreComicsSuccess, (state, { comics, ids }) => {
    return {
      ...comicAdapter.addMany(comics, state),
      comicsListId: [...state.comicsListId, ...ids],
    };
  }),
  on(comicActions.sortBy, (state, { orderBy }) => {
    return {
      ...state,
      scrolling: { ...state.scrolling, offset: 0 },
      filterOption: { ...state.filterOption, orderBy },
    };
  }),
  on(comicActions.filterComics, (state, { filter }) => {
    return {
      ...state,
      scrolling: { ...state.scrolling, offset: 0 },
      filterOption: {
        ...state.filterOption,
        ...filter,
      },
      isFiltered: true,
    };
  }),
  on(comicActions.cancelFilterComic, (state) => {
    return {
      ...state,
      filterOption: {
        ...state.filterOption,
        format: '',
        issueNumber: null,
        orderBy: '',
        titleStartsWith: '',
      },
      isFiltered: true,
    };
  }),
  on(comicActions.addComicBookmark, (state, { id }) => ({
    ...state,
    bookmarks: [...state.bookmarks, id],
  })),
  on(comicActions.removeComicBookmark, (state, { id }) => {
    const bookmarks = [...state.bookmarks];
    bookmarks.splice(bookmarks.indexOf(id), 1);
    return { ...state, bookmarks };
  })
);

export function comicReducer(state: IComicState | undefined, action: Action) {
  return _comicReducer(state, action);
}
