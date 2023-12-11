import { createFeatureSelector, createSelector } from "@ngrx/store";
import {HuntingState} from "./hunting.reducer";
import {HUNTING_FEATURE_KEY} from "./hunting.state.module";

export const selectHuntingState = createFeatureSelector<HuntingState>(HUNTING_FEATURE_KEY);

/**
 * Local selectors
 */

const getAllHuntings = (state: HuntingState) => state.collection;
// const getHuntingDetails = (state: HuntingState) => state.specificHuntID;
const getSelectedHuntingID = (state: HuntingState) => state.selectedHuntingID;
const getErrors = (state: HuntingState) => state.errors
const getLoadingState = (state: HuntingState) => state.loading

const getSelectedHunting = createSelector(
  getAllHuntings,
  // getHuntingDetails,
  getSelectedHuntingID,
  (huntings, selectedHuntingID) => huntings.find(hunting => hunting.id === selectedHuntingID) || null
);

/**
 * Global selectors
 */
export const selectHuntings = createSelector(
  selectHuntingState,
  getAllHuntings
);

export const selectSelectedHuntingID = createSelector(
  selectHuntingState,
  getSelectedHuntingID
);

export const selectSelectedHunting = createSelector(
  selectHuntingState,
  getSelectedHunting
);

export const selectLoadingState = createSelector(
  selectHuntingState,
  getLoadingState
);

export const selectErrorState = createSelector(
  selectHuntingState,
  getErrors
);
