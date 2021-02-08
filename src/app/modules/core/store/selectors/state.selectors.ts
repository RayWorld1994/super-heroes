import { createFeatureSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

const stateFetureSelected = createFeatureSelector<IAppState>('state')
