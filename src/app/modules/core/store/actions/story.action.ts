import { createAction, props } from '@ngrx/store';
import { FilterStory } from '../../interfaces/filter-story.interface';
import { InfiniteScroolling } from '../../interfaces/scrolling.interface';
import { Story } from '../../interfaces/story/story.interface';

export enum EStoryActions {
  getStorys = '[Story Page] Get Stories',
  getStorysSuccess = '[Story Page] Get Stories Success',
  storySelected = '[Story Page] Get Story',
  storySelectedSuccess = '[Story Page] Get Story Success',
  getMoreStorys = '[Story Page] Get More Stories',
  getMoreStorysSuccess = '[Story Page] Get More Stories Success',
  getStorysFiltered = '[Story Page] Get Stories Filtered',
  cancelFilterStory = '[Story Page] Cancel Filter Stories',
  addStoryToBookmark = '[Story Page] Add Story to Bookmark List',
  removeStoryToBookmark = '[Story Page] Remove Story to Bookmark List',
}

export const getStories = createAction(EStoryActions.getStorys);
export const getStoriesSuccess = createAction(
  EStoryActions.getStorysSuccess,
  props<{ stories: Story[]; scrolling: InfiniteScroolling; ids: number[] }>()
);
export const storySelected = createAction(
  EStoryActions.storySelected,
  props<{ id: number }>()
);
export const storySelectedSuccess = createAction(
  EStoryActions.storySelectedSuccess,
  props<{ story: Story }>()
);
export const getMoreStories = createAction(EStoryActions.getMoreStorys);
export const getMoreStoriesSuccess = createAction(
  EStoryActions.getMoreStorysSuccess,
  props<{ stories: Story[]; offset: number; ids: number[] }>()
);
export const filterStories = createAction(
  EStoryActions.getStorysFiltered,
  props<{ filter: FilterStory }>()
);

export const cancelFilterStory = createAction(EStoryActions.cancelFilterStory);

export const addStoryBookmark = createAction(
  EStoryActions.addStoryToBookmark,
  props<{ id: number }>()
);
export const removeStoryBookmark = createAction(
  EStoryActions.removeStoryToBookmark,
  props<{ id: number }>()
);
