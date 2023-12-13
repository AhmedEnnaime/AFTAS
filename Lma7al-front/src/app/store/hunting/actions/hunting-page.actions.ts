import { createAction, props } from "@ngrx/store";
import {Hunting} from "../../../model/interfaces/hunting";
import { CompetitionMember } from "src/app/model/interfaces/ranking.model";

export const enter = createAction('[Hunting page] enter');

export const selectHunting = createAction(
  '[Hunting page] select hunting',
  props<{huntingID: number}>()
);

export const unselectHuntings = createAction('[Hunting page] unselect hunting');

export const addHunting = createAction(
  '[Hunting page] add hunting',
  props<{hunting: Hunting}>()
);

export const updateFishNumber = createAction(
  '[Hunting page] update fish number',
  props<{huntingID: number| undefined, hunting: Hunting}>()
);

export const deleteHunting = createAction(
  '[Hunting page] delete hunting',
  props<{huntingID: number | undefined}>()
);

export const selectHuntingDetails = createAction(
  '[Hunting page] select hunting details',
  props<{specific: CompetitionMember}>()
);

export const addBatchHunting = createAction(
  '[Hunting page] add batch hunting',
  props<{huntings: Hunting[]}>()
);
