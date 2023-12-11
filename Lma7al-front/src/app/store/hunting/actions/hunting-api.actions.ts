import { createAction, props } from "@ngrx/store";
import {Hunting} from "../../../model/interfaces/hunting";

export const huntingsLoadedSuccessfully = createAction(
  '[Hunting api] hunting loaded successfully',
  props<{huntings: Hunting[]}>()
);

export const huntingsLoadedFailure = createAction(
  '[Hunting api] hunting loaded failure',
  props<{errors: {}}>()
);

export const huntingAddedSuccessfully = createAction(
  '[Hunting api] hunting added successfully',
  props<{addedHunting: Hunting}>()
);

export const huntingsAddedFailure = createAction(
  '[Hunt api] hunt added failure',
  props<{errors: {}}>()
);

export const batchHuntingAddedSuccessfully = createAction(
  '[Hunting api] batch hunting added successfully',
  props<{addedBatchHunting: Hunting[]}>()
);

export const batchHuntingsAddedFailure = createAction(
  '[Hunt api] batch hunt added failure',
  props<{errors: {}}>()
);

export const fishNumberUpdatedSuccessfully = createAction(
  '[Hunting api] fish number updated successfully',
  props<{updatedFishNumber: Hunting}>()
);

export const fishNumberUpdatedFailure = createAction(
  '[Hunting api] fish number updated failure',
  props<{errors: {}}>()
);

export const huntingDeletedSuccessfully = createAction(
  '[Hunting api] hunting deleted successfully',
  props<{message: string, huntingID: number}>()
);

export const huntingDeletedFailure = createAction(
  '[Hunting api] hunting deleted failure',
  props<{errors: {}}>()
);

export const huntDetailsLoadedSuccessfully = createAction(
  '[Hunting api] hunt details loaded successfully',
  props<{huntings: Hunting[]}>()
);

export const huntDetailsLoadedFailure = createAction(
  '[Hunting api] hunt details loaded failure',
  props<{errors: {}}>()
);
