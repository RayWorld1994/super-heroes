import { EOrderComicBy } from './../../utils/e-order-comic-by.enum';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { comicAdapter, IComicState } from '../state/comic.state';

export const comicSelectedFeature = createFeatureSelector<IComicState>(
  'comicState'
);

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = comicAdapter.getSelectors();

export const getComicsIds = createSelector(comicSelectedFeature, selectIds);
export const getComicsEntities = createSelector(
  comicSelectedFeature,
  selectEntities
);
export const getAllComics = createSelector(comicSelectedFeature, selectAll);
export const getComicTotal = createSelector(comicSelectedFeature, selectTotal);
export const getCurrentComicId = createSelector(
  comicSelectedFeature,
  (state) => state.selectedComicId
);
export const getCurrentComic = createSelector(
  getComicsEntities,
  getCurrentComicId,
  (comicEntities, comicId) => {
    return comicId ? comicEntities[comicId] : undefined;
  }
);
export const getlistByComic = createSelector(getCurrentComic, (comic) => {
  return [
    { type: 'stories', list: comic?.stories },
    { type: 'characters', list: comic?.characters },
    { type: 'creators', list: comic?.creators },
    { type: 'events', list: comic?.events },
  ];
});
export const getOffset = createSelector(
  comicSelectedFeature,
  (state) => state.offset
);
export const getOrderBy = createSelector(
  comicSelectedFeature,
  (state) => state.orderBy
);

export const getOrderByTitle = createSelector(getOrderBy, (orderBy) => {
  if (
    orderBy === EOrderComicBy.titleAtoZ ||
    orderBy === EOrderComicBy.titleZtoA
  ) {
    return orderBy;
  }
  return EOrderComicBy.titleAtoZ;
});
export const getOrderByIssue = createSelector(getOrderBy, (orderBy) => {
  if (
    orderBy === EOrderComicBy.issueNumber1to9 ||
    orderBy === EOrderComicBy.issueNumber9to1
  ) {
    return orderBy;
  }
  return EOrderComicBy.issueNumber1to9;
});

export const comicsSort = createSelector(
  comicSelectedFeature,
  getAllComics,
  (state, comics) => {
    switch (state.orderBy) {
      case EOrderComicBy.titleAtoZ:
        return comics.sort((a, b) =>
          a.title == b.title ? 0 : a.title > b.title ? 1 : -1
        );
      case EOrderComicBy.titleZtoA:
        return comics.sort((a, b) =>
          a.title == b.title ? 0 : a.title > b.title ? -1 : 1
        );
      case EOrderComicBy.issueNumber1to9:
        return comics.sort((a, b) => a.issueNumber - b.issueNumber);
      case EOrderComicBy.issueNumber9to1:
        return comics.sort((a, b) => b.issueNumber - b.issueNumber);
      default:
        return comics;
    }
  }
);

export const getComicOnScreen = createSelector(
  comicsSort,
  getOffset,
  getOrderBy,
  (comics, offset) => comics?.slice(0, offset)
);
