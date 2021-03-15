import { Story } from './../../interfaces/story/story.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IStoryState, storyAdapter } from './../state/story.state';

export const storySelectedFeature = createFeatureSelector<IStoryState>(
  'storyState'
);

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = storyAdapter.getSelectors();

export const getStoriesIds = createSelector(storySelectedFeature, selectIds);
export const getStoriesEntities = createSelector(
  storySelectedFeature,
  selectEntities
);
export const getAllStories = createSelector(storySelectedFeature, selectAll);
export const getStorieTotal = createSelector(storySelectedFeature, selectTotal);
export const getCurrentStorieId = createSelector(
  storySelectedFeature,
  (state) => state.selectedStoryId
);
export const getCurrentStorie = createSelector(
  getStoriesEntities,
  getCurrentStorieId,
  (storyEntities, storyId) => {
    return storyId ? storyEntities[storyId] : undefined;
  }
);
export const getlistByStorie = createSelector(getCurrentStorie, (story) => {
  return [
    { type: 'comic', list: story?.comics },
    { type: 'characters', list: story?.characters },
    { type: 'creators', list: story?.creators },
    { type: 'events', list: story?.events },
  ];
});
export const getOffset = createSelector(
  storySelectedFeature,
  (state) => state.scrolling.offset
);
export const getFilterOption = createSelector(
  storySelectedFeature,
  ({ filterOption }) => filterOption
);
export const getOrderStory = createSelector(
  getFilterOption,
  ({ orderBy }) => orderBy
);
export const getIdsBookmarks = createSelector(
  storySelectedFeature,
  ({ bookmarks }) => bookmarks
);
export const getStoriesBookmarks = createSelector(
  getStoriesEntities,
  getIdsBookmarks,
  (entities, ids) => {
    return ids.map((id) => entities[id] as Story);
  }
);
export const getIsFiltered = createSelector(
  storySelectedFeature,
  ({ isFiltered }) => isFiltered
);
export const getStorieHashIds = createSelector(
  storySelectedFeature,
  ({ storiesListId }) => storiesListId
);
export const getStorieOnScreen = createSelector(
  getStoriesEntities,
  getStorieHashIds,
  (entites, ids) => ids.map((id) => entites[id] as Story)
);
