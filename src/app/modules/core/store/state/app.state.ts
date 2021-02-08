import * as fromCharacter from './character.state';
import * as fromComic from './comic.state';
export interface IAppState {
  characterState: fromCharacter.ICharacterState;
  comicState: fromComic.IComicState;
}

const _initialAppState: IAppState = {
  characterState: fromCharacter.initialCharacterState,
  comicState: fromComic.initialComicState,
};

export const initialAppState: IAppState = _initialAppState;
