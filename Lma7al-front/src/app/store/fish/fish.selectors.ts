import { createFeatureSelector, createSelector } from "@ngrx/store";
import {FishState} from "./fish.reducer";
import {FISH_FEATURE_KEY} from "./fish.state.module";

export const selectFishState = createFeatureSelector<FishState>(FISH_FEATURE_KEY);

/**
 * Local selectors
 */

const getAllFishes = (state: FishState) => state.collection;
const getSelectedFishName = (state: FishState) => state.selectedFishName;
const getErrors = (state: FishState) => state.errors
const getLoadingState = (state: FishState) => state.loading

const getSelectedFish = createSelector(
  getAllFishes,
  getSelectedFishName,
  (fishes, selectedFishName) => fishes.find(fish => fish.name === selectedFishName) || null
);

/**
 * Global selectors
 */
export const selectFishes = createSelector(
  selectFishState,
  getAllFishes
);

export const selectSelectedFishName = createSelector(
  selectFishState,
  getSelectedFishName
);

export const selectSelectedFish = createSelector(
  selectFishState,
  getSelectedFish
);

export const selectLoadingState = createSelector(
  selectFishState,
  getLoadingState
);

export const selectErrorState = createSelector(
  selectFishState,
  getErrors
);
