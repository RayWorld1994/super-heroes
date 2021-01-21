import { Character } from '../../interfaces/character.interface';

export interface ICharacterState {
  characters: Character[];
}

export const initialCharacterState: ICharacterState = {
  characters: [],
};
