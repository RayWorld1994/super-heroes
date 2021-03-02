import { EOrderComicBy } from './../../utils/e-order-comic-by.enum';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { comicAdapter, IComicState } from '../state/comic.state';
import { Comic } from '../../interfaces/comic/comic.interface';

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
  (state) => state.scrolling.offset
);
export const getFilterOption = createSelector(
  comicSelectedFeature,
  ({ filterOption }) => filterOption
);
export const getOrderComic = createSelector(
  getFilterOption,
  ({ orderBy }) => orderBy
);
export const getIdsBookmarks = createSelector(
  comicSelectedFeature,
  ({ bookmarks }) => bookmarks
);
export const getComicsBookmarks = createSelector(
  getComicsEntities,
  getIdsBookmarks,
  (entities, ids) => {
    return ids.map((id) => entities[id] as Comic);
  }
);
export const getIsFiltered = createSelector(
  comicSelectedFeature,
  ({ isFiltered }) => isFiltered
);
export const getComicHashIds = createSelector(
  comicSelectedFeature,
  ({ comicsListId }) => comicsListId
);
export const getComicOnScreen = createSelector(
  getComicsEntities,
  getComicHashIds,
  (entites, ids) => ids.map((id) => entites[id] as Comic)
);
