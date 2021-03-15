import { Action, createReducer, on } from '@ngrx/store';
import { initialStoryState, IStoryState } from '../state/story.state';
import * as storyActions from 'src/app/modules/core/store/actions/story.action';
import { storyAdapter } from '../state/story.state';
import { EOrderStoryBy } from '../../utils/e-order-story-by.enum';

const _storyReducer = createReducer(
  initialStoryState,
  on(storyActions.getStories, (state) => ({
    ...state,
    scrolling: { ...state.scrolling, offset: 0 },
    filterOption: {
      ...state.filterOption,
      format: '',
      issueNumber: null,
      orderBy: EOrderStoryBy.id1to9,
    },
  })),
  on(storyActions.getStoriesSuccess, (state, { stories, ids, scrolling }) => {
    return {
      ...storyAdapter.upsertMany(stories, state),
      scrolling: { ...state.scrolling, ...scrolling },
      storiesListId: ids,
    };
  }),
  on(storyActions.storySelected, (state, { id }) => ({
    ...state,
    selectedStoryId: id,
  })),
  on(storyActions.storySelectedSuccess, (state, { story }) => {
    return storyAdapter.upsertOne(story, state);
  }),
  on(storyActions.getMoreStories, (state) => {
    const offset =
      state.scrolling.offset + 20 > state.scrolling.total
        ? state.scrolling.total
        : state.scrolling.offset + 20;
    return {
      ...state,
      scrolling: { ...state.scrolling, offset },
    };
  }),
  on(storyActions.getMoreStoriesSuccess, (state, { stories, ids, offset }) => {
    return {
      ...storyAdapter.addMany(stories, state),
      storiesListId: [...state.storiesListId, ...ids],
      scrolling: { ...state.scrolling, offset },
    };
  }),
  on(storyActions.filterStories, (state, { filter }) => {
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
  on(storyActions.cancelFilterStory, (state) => {
    return {
      ...state,
      filterOption: {
        ...state.filterOption,
        format: '',
        issueNumber: null,
        orderBy: EOrderStoryBy.id1to9,
        titleStartsWith: '',
      },
      isFiltered: false,
    };
  }),
  on(storyActions.addStoryBookmark, (state, { id }) => {
    return {
      ...state,
      bookmarks: [...state.bookmarks, id],
    };
  }),
  on(storyActions.removeStoryBookmark, (state, { id }) => {
    const bookmarks = [...state.bookmarks];
    bookmarks.splice(bookmarks.indexOf(id), 1);
    return { ...state, bookmarks };
  })
);

export function storyReducer(state: IStoryState | undefined, action: Action) {
  return _storyReducer(state, action);
}
