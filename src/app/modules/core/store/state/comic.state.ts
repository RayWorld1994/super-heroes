import { EOrderComicBy } from './../../utils/e-order-comic-by.enum';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Comic } from '../../interfaces/comic/comic.interface';
import { FilterComic } from '../../interfaces/filter-comic.interface';
import { InfiniteScroolling } from '../../interfaces/scrolling.interface';

export interface IComicState extends EntityState<Comic> {
  comicsListId: number[];
  selectedComicId: number | null;
  filterOption: FilterComic;
  bookmarks: number[];
  scrolling: InfiniteScroolling;
  isFiltered: boolean;
}

export const comicAdapter: EntityAdapter<Comic> = createEntityAdapter<Comic>();

const _initialComicState: IComicState = comicAdapter.getInitialState({
  selectedComicId: null,
  comicsListId: [],
  scrolling: { offset: 0, total: 0, limit: 0 },
  filterOption: {
    orderBy: EOrderComicBy.titleAtoZ,
    format: '',
    issueNumber: null,
    titleStartsWith: '',
  },
  isFiltered: false,
  bookmarks: [],
});

export const initialComicState = _initialComicState;
