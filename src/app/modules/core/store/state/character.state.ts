import { InfiniteScroolling } from './../../interfaces/scrolling.interface';
import { FilterCharacter } from './../../interfaces/filter.character';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Character } from '../../interfaces/character/character.interface';
import { EOrderBy } from '../../utils/eorder-by.enum';

export interface ICharacterState extends EntityState<Character> {
  characterListId: number[];
  selectedCharacterId: number;
  filterOption: FilterCharacter;
  bookmark: number[];
  scrolling: InfiniteScroolling;
  isFiltered: boolean;
}

export const characterAdapter: EntityAdapter<Character> = createEntityAdapter<Character>();

export const initialCharacterState: ICharacterState = characterAdapter.getInitialState(
  {
    characterListId: [],
    selectedCharacterId: 0,
    scrolling: { offset: 0, total: 0, limit: 0 },
    filterOption: {
      orderBy: EOrderBy.OrderAtoZ,
      byComic: '',
      byName: '',
      byStory: '',
    },
    isFiltered: false,
    bookmark: [],
  }
);
