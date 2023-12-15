import { createReducer, on } from '@ngrx/store';
import { Competition } from 'src/app/model/interfaces/competition.model';

import * as competitionPageActions from './actions/competition-page.actions';
import * as competitionApiActions from './actions/competition-api.actions';

export interface CompetitionState {
  collection: Competition[];
  selectedCompetitionCode: String | null;
  currentPage: Number | number | undefined;
  totalPages: Number | number | undefined;
  pageSize: Number | number | undefined;
  totalElements: Number | number | undefined;
  loading: boolean;
  errors: {};
}

const initialState: CompetitionState = {
  collection: [],
  selectedCompetitionCode: null,
  currentPage: 0,
  totalPages: 1,
  pageSize: 10,
  totalElements: 0,
  loading: false,
  errors: {},
};

export const competitionReducer = createReducer(
  initialState,
  on(
    competitionPageActions.enter,
    competitionPageActions.LoadClosedCompetitions,
    competitionPageActions.LoadFutureCompetitions,
    competitionPageActions.LoadCurrentCompetition,
    competitionPageActions.getCompetitionPage,
    (state, action) => ({
      ...state,
      selectedCometitionCode: null,
      loading: true,
      currentPage: action.page,
      errors: {},
    })
  ),
  on(competitionPageActions.selectCompetition, (state, action) => ({
    ...state,
    selectedCometitionCode: action.competitionCode,
    loading: true,
  })),
  on(competitionPageActions.unselectCompetition, (state, action) => ({
    ...state,
    selectedCometitionCode: null,
  })),
  on(
    competitionPageActions.addCompetition,
    competitionPageActions.updateCompetition,
    competitionPageActions.deleteCompetition,
    (state, action) => ({
      ...state,
      loading: true,
    })
  ),
  on(
    competitionApiActions.competitionsLoadedSuccessfully,
    competitionApiActions.closedCompetitionsLoadedSuccessfully,
    competitionApiActions.currentCompetitionLoadedSuccessfully,
    competitionApiActions.futureCompetitionsLoadedSuccessfully,
    competitionApiActions.competitionsPageLoadedSuccessfully,
    (state, action) => ({
      ...state,
      collection: action.competitions.content,
      currentPage: action.competitions.number,
      totalPages: action.competitions.totalPages,
      pageSize: action.competitions.size,
      totalElements: action.competitions.totalElements,
      selectedCometitionCode: null,
      loading: false,
    })
  ),
  on(competitionApiActions.competitionAddedSuccessfully, (state, action) => ({
    ...state,
    loading: false,
    collection: createCompeition(state.collection, action.addedCompetition),
  })),
  on(competitionApiActions.competitionDeletedSuccessfully, (state, action) => ({
    ...state,
    collection: deleteCompetition(state.collection, action.competitionCode),
    loading: false,
  })),
  on(competitionApiActions.competitionUpdatedSuccessfully, (state, action) => ({
    ...state,
    loading: false,
    collection: updateCompeition(state.collection, action.updatedCompetition),
  })),
  on(
    competitionApiActions.competitionsLoadedFailure,
    competitionApiActions.closedCompetitionsLoadedFailure,
    competitionApiActions.currentCompetitionLoadedFailure,
    competitionApiActions.futureCompetitionsLoadedFailure,
    competitionApiActions.competitionAddedFailure,
    competitionApiActions.competitionsUpdatedFailure,
    competitionApiActions.competitionDeletedFailure,
    competitionApiActions.competitionsPageLoadedFailure,
    competitionApiActions.competitionFoundedFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errors: action.errors,
    })
  ),
  on(competitionApiActions.competitionFoundedSuccessfully, (state, action) => ({
    ...state,
    collection: [action.competition],
    loading: false,
  }))
);

const createCompeition = (
  compeitions: Competition[],
  addedCompeition: Competition
) => [...compeitions, addedCompeition];
const updateCompeition = (
  competitions: Competition[],
  updatedCompetition: Competition
): Competition[] =>
  competitions.map((competition) =>
    competition.code == updatedCompetition.code
      ? Object.assign({}, competition, updatedCompetition)
      : competition
  );
const deleteCompetition = (
  competitions: Competition[],
  competitionCode: String
) => competitions.filter((competition) => competition.code != competitionCode);
