// current-date.actions.ts
import { createAction, props } from '@ngrx/store';

export const updateCurrentDate = createAction(
  '[Current Date] Update Current Date',
  props<{ currentDate: Date }>()
);