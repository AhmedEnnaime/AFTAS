import { createReducer, createSelector, on } from "@ngrx/store";
import { Member } from "src/app/model/interfaces/member.model";

import * as fishPageActions from "./actions/fish-page.actions"
import * as fishApiActions from "./actions/fish.api.actions"
import {Level} from "../../model/interfaces/level";
import {Fish} from "../../model/interfaces/fish";

export interface FishState {
  collection: Fish[],
  selectedFishName: string | null;
  loading: boolean;
  errors: {}
}

export const initialFishState: FishState = {
  collection: [],
  selectedFishName: null,
  loading: false,
  errors: {}
}

export const FishReducer = createReducer(
  initialFishState,
  on(
    fishPageActions.enter,
    (state, action) => ({
      ...state,
      selectedFishName: null,
      loading: true,
    })),
  on(fishPageActions.unselectFishes,
    (state, action) => ({
      ...state,
      selectedFishName: null,
    })),
  on(fishPageActions.selectFishes, (state, action) => ({
    ...state,
    selectedFishName: action.fishName
  })),
  on(fishApiActions.fishesLoadedSuccessfully,
    (state, action) => ({
      ...state,
      collection: action.fishes
    })),
  on(fishApiActions.fishAddedSuccessfully, (state, action) => ({
    collection: createFish(state.collection, action.addedFish),
    selectedFishName: null,
    errors: {},
    loading: false
  })),
  on(fishApiActions.fishUpdatedSuccessfully, (state, action) => ({
    collection: updateFish(state.collection, action.updatedFish),
    selectedFishName: null,
    errors: {},
    loading: false
  })),
  on(fishApiActions.fishDeletedSuccessfully, (state, action) => ({
    collection: deleteFish(state.collection, action.fishName),
    selectedFishName: null,
    errors: {},
    loading: false
  })),
  on(fishApiActions.fishesAddedFailure,
    fishApiActions.fishesUpdatedFailure,
    fishApiActions.fishesDeletedFailure,
    fishApiActions.fishesLoadedFailure,
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


const createFish = (fishes: Fish[], newFish: Fish) => [...fishes, newFish];
const updateFish = (fishes: Fish[], updatedFish: Fish) => (
  fishes.map(
    fish =>
      fish.name === updatedFish.name
        ? Object.assign({}, fish, updatedFish)
        : fish
  )
)
const deleteFish = (fishes: Fish[], fishName: string) => fishes.filter(fish => fish.name != fishName);
