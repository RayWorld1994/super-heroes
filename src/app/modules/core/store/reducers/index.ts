import { comicReducer } from './comic.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { characterReducer } from './character.reducer';
import { IAppState } from '../state/app.state';
import { storageMetaReducer } from './store.metareducer';
import { storyReducer } from './story.reducer';

export const reducers: ActionReducerMap<IAppState> = {
  characterState: characterReducer,
  comicState: comicReducer,
  StoryState: storyReducer,
};

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];
