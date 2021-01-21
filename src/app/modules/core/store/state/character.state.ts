import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Character } from '../../interfaces/character/character.interface';

export interface ICharacterState extends EntityState<Character> {
  selectedCharacterId: number | null;
}

export const characterAdapter: EntityAdapter<Character> = createEntityAdapter<Character>();

export const initialCharacterState: ICharacterState = characterAdapter.getInitialState(
  { selectedCharacterId: null }
);
