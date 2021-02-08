import { FilterCharacter } from './../../interfaces/filter.character';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Character } from '../../interfaces/character/character.interface';
import { EOrderBy } from '../../utils/eorder-by.enum';

export interface ICharacterState extends EntityState<Character> {
  selectedCharacterId: number;
  offset: number;
  filter: FilterCharacter;
  bookmark: number[];
}

export const characterAdapter: EntityAdapter<Character> = createEntityAdapter<Character>();

export const initialCharacterState: ICharacterState = characterAdapter.getInitialState(
  {
    selectedCharacterId: 0,
    offset: 0,
    filter: {
      orderBy: EOrderBy.OrderAtoZ,
      byComic: '',
      byName: '',
      byStory: '',
    },
    bookmark: [],
  }
);
