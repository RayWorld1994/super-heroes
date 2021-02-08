import { EOrderComicBy } from './../../utils/e-order-comic-by.enum';
import { EOrderBy } from './../../utils/eorder-by.enum';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Comic } from '../../interfaces/comic/comic.interface';
import { FilterComic } from '../../interfaces/filter-comic.interface';

export interface IComicState extends EntityState<Comic> {
  selectedComicId: number | null;
  offset: number;
  orderBy: string;
}

export const comicAdapter: EntityAdapter<Comic> = createEntityAdapter<Comic>();

const _initialComicState: IComicState = comicAdapter.getInitialState({
  selectedComicId: null,
  offset: 0,
  orderBy: EOrderComicBy.issueNumber1to9,
});

export const initialComicState = _initialComicState;
