// current-date.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { updateCurrentDate } from './calender.actions';

export const currentDateReducer = createReducer(
  new Date(), // Initial state is the current date
  on(updateCurrentDate, (_, { currentDate }) => currentDate),
);
