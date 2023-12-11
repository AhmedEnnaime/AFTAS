import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RankingState } from "./ranking.reducer";
import { RANKING_FEATURE_KEY } from "./ranking.state.module";

export const selectRankingState = createFeatureSelector<RankingState>(RANKING_FEATURE_KEY);

/**
 * Local selectors
 */

const getAllRankings = (state: RankingState) => state.collection;
const getSelectedRanking = (state: RankingState) => state.selectedRankingId;
const getErros = (state: RankingState) => state.errors
const getLoadingState = (state: RankingState) => state.loading

const getSelectedMember = createSelector(
    getAllRankings,
    getSelectedRanking,
    (rankings, seletedRankingId) => rankings.find(ranking => JSON.stringify(ranking.id) === JSON.stringify(seletedRankingId)) || null
);

/**
 * Global selectors
 */
export const selectRankings = createSelector(
    selectRankingState,
    getAllRankings
);

export const selectSelectedRankingId = createSelector(
    selectRankingState,
    getSelectedRanking
);

export const selectSelectedRanking = createSelector(
    selectRankingState,
    getSelectedMember
);

export const selectLoadingState = createSelector(
    selectRankingState,
    getLoadingState
);

export const selectErrorState = createSelector(
    selectRankingState,
    getErros
);