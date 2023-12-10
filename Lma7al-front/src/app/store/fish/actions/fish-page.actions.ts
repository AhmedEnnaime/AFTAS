import { createAction, props } from "@ngrx/store";
import {Fish} from "../../../model/interfaces/fish";

export const enter = createAction('[Fish page] enter');

export const selectFishes = createAction(
  '[Fish page] select fish',
  props<{fishName: string}>()
);

export const unselectFishes = createAction('[Fish page] unselect fish');

export const addFish = createAction(
  '[Fish page] add fish',
  props<{fish: Fish}>()
);

export const updateFish = createAction(
  '[Fish page] update fish',
  props<{fishName: string, fish: Fish}>()
);

export const deleteFish = createAction(
  '[Fish page] delete fish',
  props<{fishName: string | undefined}>()
);
