import { createReducer, on } from "@ngrx/store";

import * as huntingPageActions from "./actions/hunting-page.actions"
import * as huntingApiActions from "./actions/hunting-api.actions"
import {Hunting} from "../../model/interfaces/hunting";
import {CompetitionMember} from "../../model/interfaces/ranking.model";

export interface HuntingState {
  collection: Hunting[],
  selectedHuntingID: number | null;
  specificHuntID: CompetitionMember | null;
  loading: boolean;
  errors: {}
}

const initialHuntingState: HuntingState = {
  collection: [],
  selectedHuntingID: null,
  specificHuntID: null,
  loading: false,
  errors: {}
}

export const HuntingReducer = createReducer(
  initialHuntingState,
  on(
    huntingPageActions.enter,
    (state, action) => ({
      ...state,
      loading: true,
    })),
  on(huntingPageActions.selectHuntingDetails,
    (state, action) => ({
      ...state,
      specificHuntID: action.specific,
      loading: true,
    })
  ),
  on(huntingPageActions.unselectHuntings,
    (state, action) => ({
      ...state,
      selectedHuntingID: null,
    })),
  on(huntingPageActions.selectHunting, (state, action) => ({
    ...state,
    selectedHuntingID: action.huntingID
  })),
  on(huntingApiActions.huntingsLoadedSuccessfully,
    huntingApiActions.huntDetailsLoadedSuccessfully,
    (state, action) => ({
      ...state,
      collection: action.huntings,
      loading: false,
    })),
  on(huntingPageActions.addHunting,
    huntingPageActions.updateFishNumber,
    huntingPageActions.deleteHunting,
    huntingPageActions.addBatchHunting,
    (state, action) => ({
      ...state,
      loading: true
    })
  ),
  on(huntingApiActions.huntingAddedSuccessfully, (state, action) => ({
    collection: createHunting(state.collection, action.addedHunting),
    selectedHuntingID: null,
    specificHuntID: null,
    errors: {},
    loading: false
  })),
  on(huntingApiActions.fishNumberUpdatedSuccessfully, (state, action) => ({
    collection: updateFishNumber(state.collection, action.updatedFishNumber),
    selectedHuntingID: null,
    specificHuntID: null,
    errors: {},
    loading: false
  })),
  on(huntingApiActions.huntingDeletedSuccessfully, (state, action) => ({
    collection: deleteHunting(state.collection, action.huntingID),
    selectedHuntingID: null,
    specificHuntID: null,
    errors: {},
    loading: false
  })),
  on(huntingApiActions.huntingsAddedFailure,
    huntingApiActions.fishNumberUpdatedFailure,
    huntingApiActions.huntDetailsLoadedFailure,
    huntingApiActions.huntingDeletedFailure,
    huntingApiActions.huntingsLoadedFailure,
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


const createHunting = (huntings: Hunting[], newHunting: Hunting) => [...huntings, newHunting];
const updateFishNumber = (huntings: Hunting[], updatedFishNumber: Hunting) => (
  huntings.map(
    hunting =>
      hunting.id === updatedFishNumber.id
        ? Object.assign({}, hunting, updatedFishNumber)
        : hunting
  )
)
const deleteHunting = (huntings: Hunting[], huntingID: number) => huntings.filter(hunting => hunting.id != huntingID);
