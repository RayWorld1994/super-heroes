import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Character } from '../../interfaces/character/character.interface';
import { EOrderBy } from '../../utils/eorder-by.enum';

export interface ICharacterState extends EntityState<Character> {
  selectedCharacterId: number | null;
  charactersOnScreenIds: number[];
  offset: number;
  orderBy: string;
}

export const characterAdapter: EntityAdapter<Character> = createEntityAdapter<Character>();

export const initialCharacterState: ICharacterState = characterAdapter.getInitialState(
  {
    selectedCharacterId: null,
    charactersOnScreenIds: [],
    offset: 0,
    orderBy: EOrderBy.OrderAtoZ,
  }
);
