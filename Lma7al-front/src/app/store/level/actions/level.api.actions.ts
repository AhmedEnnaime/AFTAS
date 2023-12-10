import { createAction, props } from "@ngrx/store";
import {Level} from "../../../model/interfaces/level";

export const levelsLoadedSuccessfully = createAction(
  '[Level api] level loaded successfully',
  props<{levels: Level[]}>()
);

export const levelsLoadedFailure = createAction(
  '[Level api] level loaded failure',
  props<{errors: {}}>()
);

export const levelAddedSuccessfully = createAction(
  '[Level api] level added successfully',
  props<{addedLevel: Level}>()
);

export const levelsAddedFailure = createAction(
  '[Level api] level added failure',
  props<{errors: {}}>()
);

export const levelUpdatedSuccessfully = createAction(
  '[Level api] level updated successfully',
  props<{updatedLevel: Level}>()
);

export const levelsUpdatedFailure = createAction(
  '[Level api] level updated failure',
  props<{errors: {}}>()
);

export const levelDeletedSuccessfully = createAction(
  '[Level api] level deleted successfully',
  props<{message: String, levelCode: number}>()
);

export const levelsDeletedFailure = createAction(
  '[Level api] level deleted failure',
  props<{errors: {}}>()
);
