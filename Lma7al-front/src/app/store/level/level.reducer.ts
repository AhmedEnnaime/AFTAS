import { createReducer, createSelector, on } from "@ngrx/store";
import { Member } from "src/app/model/interfaces/member.model";

import * as levelPageActions from "./actions/level-page.actions"
import * as levelApiActions from "./actions/level.api.actions"
import {Level} from "../../model/interfaces/level";

export interface LevelState {
  collection: Level[],
  selectedLevelCode: number | null;
  loading: boolean;
  errors: {}
}

export const initialLevelState: LevelState = {
  collection: [],
  selectedLevelCode: null,
  loading: false,
  errors: {}
}

export const LevelReducer = createReducer(
  initialLevelState,
  on(
    levelPageActions.enter,
    (state, action) => ({
      ...state,
      selectedLevelCode: null,
      loading: true,
    })),
  on(levelPageActions.unselectLevels,
    (state, action) => ({
      ...state,
      selectedLevelCode: null,
    })),
  on(levelPageActions.selectLevels, (state, action) => ({
    ...state,
    selectedLevelCode: action.levelCode
  })),
  on(levelApiActions.levelsLoadedSuccessfully,
    (state, action) => ({
      ...state,
      collection: action.levels
    })),
  on(levelApiActions.levelAddedSuccessfully, (state, action) => ({
    collection: createLevel(state.collection, action.addedLevel),
    selectedLevelCode: null,
    errors: {},
    loading: false
  })),
  on(levelApiActions.levelUpdatedSuccessfully, (state, action) => ({
    collection: updateLevel(state.collection, action.updatedLevel),
    selectedLevelCode: null,
    errors: {},
    loading: false
  })),
  on(levelApiActions.levelDeletedSuccessfully, (state, action) => ({
    collection: deleteLevel(state.collection, action.levelCode),
    selectedLevelCode: null,
    errors: {},
    loading: false
  })),
  on(levelApiActions.levelsAddedFailure,
    levelApiActions.levelsUpdatedFailure,
    levelApiActions.levelsDeletedFailure,
    levelApiActions.levelsLoadedFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errors: action.errors
    })
  )

);


/**
 * reducers call back functions
 */


const createLevel = (levels: Level[], newLevel: Level) => [...levels, newLevel];
const updateLevel = (levels: Level[], updatedLevel: Level) => (
  levels.map(
    level =>
      level.code === updatedLevel.code
        ? Object.assign({}, level, updatedLevel)
        : level
  )
)
const deleteLevel = (levels: Level[], levelCode: number) => levels.filter(level => level.code != levelCode);
