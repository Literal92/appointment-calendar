// current-date.selector.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCurrentDateState = createFeatureSelector<Date>('currentDate');

export const selectCurrentDate = createSelector(
  selectCurrentDateState,
  (currentDate: Date) => currentDate
);
