import { Action, ActionReducer } from '@ngrx/store';
import * as _ from 'lodash';

const setSavedState = <T>(key: string, state: Partial<T>) => {
  localStorage.setItem(key, JSON.stringify(state));
};

const getSavedState = (key: string) => {
  const getFromLocalStorage = localStorage.getItem(key);
  return getFromLocalStorage ? JSON.parse(getFromLocalStorage) : null;
};

const localStorageKey = 'store';
const stateKeys = [
  'templates',
  'requests',
  'areas',
  'authentication',
  'issues',
];

export function storageMetaReducer<S, A extends Action = Action>(
  reducer: ActionReducer<S, A>
): ActionReducer<S, A> {
  let stored = false;
  return (state, action): S => {
    console.log(state, action);
    const nextState = reducer(state, action);
    if (!stored) {
      const savedState = getSavedState(localStorageKey);
      return _.merge(nextState, savedState);
    }
    const stateToSave = _.pick(nextState, stateKeys);
    setSavedState<S>(localStorageKey, stateToSave);
    return nextState;
  };
}
