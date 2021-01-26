import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { characterReducer } from './character.reducer';
import { IAppState } from '../state/app.state';
import { storageMetaReducer } from './store.metareducer';

export const reducers: ActionReducerMap<IAppState> = {
  characterState: characterReducer,
};

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];
