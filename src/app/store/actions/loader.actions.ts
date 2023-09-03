import { createAction, props } from '@ngrx/store';

export const updateLoaderState = createAction(
  '[Loader] Update loader state',
  props<{ isLoading: boolean }>()
);
