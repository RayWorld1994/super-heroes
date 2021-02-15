import { EOrderComicBy } from './../../utils/e-order-comic-by.enum';
import { createReducer, on } from '@ngrx/store';
import { comicAdapter, initialComicState } from './../state/comic.state';
import * as comicActions from '../actions/comic.action';

export const comicReducer = createReducer(
  initialComicState,
  on(comicActions.getComics, (state) => ({
    ...state,
    offset: 20,
    orderBy: EOrderComicBy.issueNumber1to9,
  })),
  on(comicActions.getComicsSuccess, (state, { comics }) => {
    return comicAdapter.upsertMany(comics, state);
  }),
  on(comicActions.comicSelected, (state, { id }) => ({
    ...state,
    selectedComicId: id,
  })),
  on(comicActions.comicSelectedSuccess, (state, { comic }) => {
    return comicAdapter.upsertOne(comic, state);
  }),
  on(comicActions.getMoreComics, (state) => ({
    ...state,
    offset: state.offset + 20,
  })),
  on(comicActions.getMoreComicsSuccess, (state, { comics, offset }) => {
    return {
      ...comicAdapter.addMany(comics, state),
      offset: offset,
    };
  }),
  on(comicActions.sortByIssueNumber, (state) => {
    const orderBy =
      state.orderBy === EOrderComicBy.issueNumber1to9
        ? EOrderComicBy.issueNumber9to1
        : EOrderComicBy.issueNumber1to9;
    return { ...state, offset: 20, orderBy };
  }),
  on(comicActions.sortByTitle, (state) => {
    const orderBy =
      state.orderBy === EOrderComicBy.titleAtoZ
        ? EOrderComicBy.titleZtoA
        : EOrderComicBy.titleAtoZ;
    return { ...state, offset: 20, orderBy };
  })
);
