import { createAction, props } from "@ngrx/store";
import {Level} from "../../../model/interfaces/level";

export const enter = createAction('[Level page] enter');

export const selectLevels = createAction(
  '[Level page] select level',
  props<{levelCode: number}>()
);

export const unselectLevels = createAction('[Level page] unselect level');

export const addLevel = createAction(
  '[Level page] add level',
  props<{level: Level}>()
);

export const updateLevel = createAction(
  '[Level page] update level',
  props<{levelCode: number, level: Level}>()
);

export const deleteLevel = createAction(
  '[Level page] delete level',
  props<{levelCode: number | undefined}>()
);
