import * as fromCharacter from './character.state';

export interface IAppState {
  characterState: fromCharacter.ICharacterState;
}

const _initialAppState: IAppState = {
  characterState: fromCharacter.initialCharacterState,
};

export const initialAppState: IAppState = _initialAppState;
