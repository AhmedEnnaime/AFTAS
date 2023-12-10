import { createFeatureSelector, createSelector } from "@ngrx/store";
import {LevelState} from "./level.reducer";
import {LEVEL_FEATURE_KEY} from "./level.state.module";

export const selectLevelState = createFeatureSelector<LevelState>(LEVEL_FEATURE_KEY);

/**
 * Local selectors
 */

const getAllLevels = (state: LevelState) => state.collection;
const getSelectedLevelCode = (state: LevelState) => state.selectedLevelCode;
const getErrors = (state: LevelState) => state.errors
const getLoadingState = (state: LevelState) => state.loading

const getSelectedLevel = createSelector(
  getAllLevels,
  getSelectedLevelCode,
  (levels, selectedLevelCode) => levels.find(level => level.code === selectedLevelCode) || null
);

/**
 * Global selectors
 */
export const selectLevels = createSelector(
  selectLevelState,
  getAllLevels
);

export const selectSelectedLevelCode = createSelector(
  selectLevelState,
  getSelectedLevelCode
);

export const selectSelectedLevel = createSelector(
  selectLevelState,
  getSelectedLevel
);

export const selectLoadingState = createSelector(
  selectLevelState,
  getLoadingState
);

export const selectErrorState = createSelector(
  selectLevelState,
  getErrors
);
