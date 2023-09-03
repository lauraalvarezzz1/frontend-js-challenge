import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromLoaderReducer from '../reducers/loader.reducer';

export const selectLoaderState =
  createFeatureSelector<fromLoaderReducer.State>('loader');

export const selectIsLoadingState = createSelector(
  selectLoaderState,
  fromLoaderReducer.selectIsLoadingState
);
