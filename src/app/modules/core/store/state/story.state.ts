import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FilterStory } from '../../interfaces/filter-story.interface';
import { InfiniteScroolling } from '../../interfaces/scrolling.interface';
import { Story } from '../../interfaces/story/story.interface';
import { EOrderStoryBy } from '../../utils/e-order-story-by.enum';

export interface IStoryState extends EntityState<Story> {
  storiesListId: number[];
  selectedStoryId: number | null;
  filterOption: FilterStory;
  bookmarks: number[];
  scrolling: InfiniteScroolling;
  isFiltered: boolean;
}

export const storyAdapter: EntityAdapter<Story> = createEntityAdapter<Story>();

const _initialStoryState: IStoryState = storyAdapter.getInitialState({
  selectedStoryId: null,
  storiesListId: [],
  scrolling: { offset: 0, total: 0, limit: 0 },
  filterOption: {
    orderBy: EOrderStoryBy.id1to9,
    modifiedSince: null,
  },
  isFiltered: false,
  bookmarks: [],
});

export const initialStoryState = _initialStoryState;
