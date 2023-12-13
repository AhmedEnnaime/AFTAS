import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompetitionState } from "./competition.reducer";
import { COMPETITION_FEATURE_KEY } from "./competitoin.state.module";


export const selectCompetitionState = createFeatureSelector<CompetitionState>(COMPETITION_FEATURE_KEY);

/**
 * Local selectors
 */

const getAllCompetitions = (state: CompetitionState) => state.collection;
const getSelectedCompetitionCode = (state: CompetitionState) => state.selectedCompetitionCode;
const getErrors = (state: CompetitionState) => state.errors
const getLoadingState = (state: CompetitionState) => state.loading
const getCurrentPage = (state: CompetitionState) => state.currentPage
const getTotalPages = (state: CompetitionState) => state.totalPages
const getTotalElements = (state: CompetitionState) => state.totalElements
const getPageSize = (state: CompetitionState) => state.pageSize

const getSelectedCompeition = createSelector(
    getAllCompetitions,
    getSelectedCompetitionCode,
    (competitions, selectedCompetitionCode) => competitions.find(competition => competition.code === selectedCompetitionCode) || null
);

/**
 * Global selectors
 */
export const selectCompetitions = createSelector(
    selectCompetitionState,
    getAllCompetitions
);

export const selectSelectedCompetitionCode = createSelector(
    selectCompetitionState,
    getSelectedCompetitionCode
);

export const selectSelectedCompetition = createSelector(
    selectCompetitionState,
    getSelectedCompeition
);

export const selectFoundedCompetition = createSelector(
    selectCompetitionState,
    (state) => state.collection[0] 
);

export const selectLoadingState = createSelector(
    selectCompetitionState,
    getLoadingState
);

export const selectErrorState = createSelector(
    selectCompetitionState,
    getErrors
);

export const selectCurrentPageState = createSelector(
    selectCompetitionState,
    getCurrentPage
);

export const selectTotalPagesState = createSelector(
    selectCompetitionState,
    getTotalPages
);

export const selectPageSize = createSelector(
    selectCompetitionState,
    getPageSize
);
