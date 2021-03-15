import * as fromCharacter from './character.state';
import * as fromComic from './comic.state';
import * as fromStory from './story.state';
export interface IAppState {
  characterState: fromCharacter.ICharacterState;
  comicState: fromComic.IComicState;
  StoryState: fromStory.IStoryState;
}

const _initialAppState: IAppState = {
  characterState: fromCharacter.initialCharacterState,
  comicState: fromComic.initialComicState,
  StoryState: fromStory.initialStoryState,
};

export const initialAppState: IAppState = _initialAppState;
