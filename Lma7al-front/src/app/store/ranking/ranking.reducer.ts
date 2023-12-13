import { createReducer, on } from "@ngrx/store";
import { CompetitionMember, Ranking } from "src/app/model/interfaces/ranking.model";

import * as rankingPageActions from './actions/ranking-page.actions' 
import * as rankingApiActions from './actions/ranking-api.actions'

export interface RankingState {
    collection: Ranking[];
    selectedRankingId: CompetitionMember | null;
    loading: boolean;
    errors: {};
}

const initialRankingState: RankingState = {
    collection: [],
    selectedRankingId: null,
    loading: false,
    errors: {}
}

export const rankingReducer = createReducer(
    initialRankingState,
    on(rankingPageActions.addRanking,
       rankingPageActions.deleteRanking,
       rankingPageActions.setCompetitionRanking,
        (state, action) => ({
            ...state,
            loading: true,
        })
    ),
    on(rankingApiActions.rankingAddedSuccessfully,
        (state, action) => ({
            ...state,
            collection: addRanking(state.collection, action.addedRanking),
            loading: false,
        })
    ),
    on(rankingApiActions.rankingDeletedSuccsessfully,
        (state, action) => ({
            ...state,
            loading: false,
            collection: deleteRanking(state.collection, action.deletedElementIdentifier),
        })
    ),
    on(rankingApiActions.rankingAddedFailure,
       rankingApiActions.rankingDeletedFailure,
       rankingApiActions.rankingSetupFailure,
        (state, action) => ({
            ...state,
            loading: false,
            errors: action.message
        })

    ),
);


const addRanking = (rankings: Ranking[], addedRanking: Ranking) => [...rankings, addedRanking];

const deleteRanking = (rankings: Ranking[], rankingId: CompetitionMember) => rankings.filter(ranking => ranking.id != rankingId);