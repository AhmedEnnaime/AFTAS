import { createReducer, on } from "@ngrx/store";
import { Competition } from "src/app/model/interfaces/competition.model";

import * as competitionPageActions from './actions/competition-page.actions';
import * as competitionApiActions from './actions/competition-api.actions';

export interface CompetitionState {
    collection: Competition[],
    selectedCometitionCode: String | null,
    loading: boolean,
    errors: {}
}

const initialState: CompetitionState = {
    collection: [],
    selectedCometitionCode: null,
    loading: false,
    errors: {}
}

export const competitionReducer = createReducer(
    initialState,
    on(competitionPageActions.enter,
       competitionPageActions.LoadClosedCompetitions,
       competitionPageActions.LoadFutureCompetitions,
       competitionPageActions.LoadCurrentCompetition,
       competitionPageActions.getCompetitionPage,
        (state, action) => ({
            ...state,
            selectedCometitionCode: null,
            loading: true,
            errors: {}
        })
    ),
    on(competitionPageActions.selectCompetition,
        (state, action) => ({
            ...state,
            selectedCometitionCode: action.competitionCode
        })
    ),
    on(competitionPageActions.unselectCompetition,
        (state, action) => ({
            ...state,
            selectedCometitionCode: null
        })
    ),
    on(competitionPageActions.addCompetition,
       competitionPageActions.updateCompetition,
       competitionPageActions.deleteCompetition,
        (state, action) => ({
            ...state,
            loading: true
        })
    ),
    on(competitionApiActions.competitionsLoadedSuccessfully,
       competitionApiActions.closedCompetitionsLoadedSuccessfully,
       competitionApiActions.currentCompetitionLoadedSuccessfully,
       competitionApiActions.futureCompetitionsLoadedSuccessfully,
       competitionApiActions.competitionsPageLoadedSuccessfully,
        (state, action) => ({
            ...state,
            collection: action.competitions,
            selectedCometitionCode: null,
            loading: false
        })
    ),
    on(competitionApiActions.competitionAddedSuccessfully,
        (state, action) => ({
            ...state,
            loading: false,
            collection: createCompeition(state.collection, action.addedCompetition)
        })
    ),
    on(competitionApiActions.competitionDeletedSuccessfully,
        (state, action) => ({
            ...state,
            collection: deleteCompetition(state.collection, action.competitionCode),
            loading: false,
        })
    ),
    on(competitionApiActions.competitionUpdatedSuccessfully,
        (state, action) => ({
            ...state,
            loading: false,
            collection: updateCompeition(state.collection, action.updatedCompetition)
        })
    ),
    on(competitionApiActions.competitionsLoadedFailure,
       competitionApiActions.closedCompetitionsLoadedFailure,
       competitionApiActions.currentCompetitionLoadedFailure,
       competitionApiActions.futureCompetitionsLoadedFailure,
       competitionApiActions.competitionAddedFailure,
       competitionApiActions.competitionsUpdatedFailure,
       competitionApiActions.competitionDeletedFailure,
       competitionApiActions.competitionsPageLoadedFailure,
        (state, action) => ({
            ...state,
            loading: false,
            errors: action.errors
        })
    ),
);



const createCompeition = (compeitions: Competition[], addedCompeition: Competition) => [...compeitions, addedCompeition];
const updateCompeition = (competitions: Competition[], updatedCompetition: Competition): Competition[] => (
    competitions.map(
        competition =>
                competition.code == updatedCompetition.code
                ? Object.assign({}, competition, updatedCompetition)
                : competition
    )
);
const deleteCompetition = (competitions: Competition[] , competitionCode: String) => competitions.filter(competition => competition.code != competitionCode);

