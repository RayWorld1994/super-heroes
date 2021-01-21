import { ActionReducerMap } from '@ngrx/store';
import { characterReducer } from './character.reducer';
import { IAppState } from '../state/app.state';

export const reducers: ActionReducerMap<IAppState> = {
  characterState: characterReducer,
};
