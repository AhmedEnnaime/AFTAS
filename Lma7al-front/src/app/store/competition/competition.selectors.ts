import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompetitionState } from "./competition.reducer";
import { COMPETITION_FEATURE_KEY } from "./competitoin.state.module";


export const selectCompetitionState = createFeatureSelector<CompetitionState>(COMPETITION_FEATURE_KEY);

/**
 * Local selectors
 */

const getAllCompetitions = (state: CompetitionState) => state.collection;
const getSelectedCompetitionCode = (state: CompetitionState) => state.selectedCometitionCode;
const getErros = (state: CompetitionState) => state.errors
const getLoadingState = (state: CompetitionState) => state.loading

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

export const selectSelectedCompetitoin = createSelector(
    selectCompetitionState,
    getSelectedCompeition
);

export const selectLoadingState = createSelector(
    selectCompetitionState,
    getLoadingState
);

export const selectErrorState = createSelector(
    selectCompetitionState,
    getErros
);