import { ICharacterState, initialCharacterState } from './character.state';

export interface IAppState {
  characterState: ICharacterState;
}

const _initialAppState: IAppState = {
  characterState: initialCharacterState,
};

export const initialAppState: IAppState = _initialAppState;
