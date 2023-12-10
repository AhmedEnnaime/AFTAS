import { createAction, props } from "@ngrx/store";
import {Fish} from "../../../model/interfaces/fish";

export const fishesLoadedSuccessfully = createAction(
  '[Fish api] fish loaded successfully',
  props<{fishes: Fish[]}>()
);

export const fishesLoadedFailure = createAction(
  '[Fish api] fish loaded failure',
  props<{errors: {}}>()
);

export const fishAddedSuccessfully = createAction(
  '[Fish api] fish added successfully',
  props<{addedFish: Fish}>()
);

export const fishesAddedFailure = createAction(
  '[Fish api] fish added failure',
  props<{errors: {}}>()
);

export const fishUpdatedSuccessfully = createAction(
  '[Fish api] fish updated successfully',
  props<{updatedFish: Fish}>()
);

export const fishesUpdatedFailure = createAction(
  '[Fish api] fish updated failure',
  props<{errors: {}}>()
);

export const fishDeletedSuccessfully = createAction(
  '[Fish api] fish deleted successfully',
  props<{message: String, fishName: string}>()
);

export const fishesDeletedFailure = createAction(
  '[Fish api] fish deleted failure',
  props<{errors: {}}>()
);
