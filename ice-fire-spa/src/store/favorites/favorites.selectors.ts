import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectFavorites = createFeatureSelector<any[]>('favorites');

export const isFavorite = (url: string) =>
  createSelector(selectFavorites, favorites => favorites.some(b => b.url === url));
