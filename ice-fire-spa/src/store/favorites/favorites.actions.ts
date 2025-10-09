import { createAction, props } from '@ngrx/store';
import { Book } from '../../app/models/common';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ book: Book }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ book: Book }>()
);
