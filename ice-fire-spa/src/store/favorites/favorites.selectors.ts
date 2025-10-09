import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Book } from '../../app/models/common';

export const selectFavorites = createFeatureSelector<Book[]>('favorites');

export const isFavorite = (url: string) =>
  createSelector(selectFavorites, favorites => favorites.some(b => b.url === url));
