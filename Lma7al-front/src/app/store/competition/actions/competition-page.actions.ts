import { createAction, props } from "@ngrx/store";
import { Competition } from "src/app/model/interfaces/competition.model";

export const enter = createAction('[Competition page] enter', props<{page?: Number, size?: Number}>());

export const findCompetition = createAction('[Rankings page] Find competition', props<{competitionCode: String}>())

export const getCompetitionPage = createAction(
    '[Competition page] get competition by page',
    props<{page: Number, size: Number}>()
);

export const selectCompetition = createAction(
    '[Competition page] select Competitions',
    props<{competitionCode: String}>()
);

export const unselectCompetition = createAction('[Competition page] unselect Competition');

export const addCompetition = createAction(
    '[Competition page] add Competition',
    props<{competition: Competition}>()
);

export const updateCompetition = createAction(
    '[Competition page] update Competition',
    props<{competitionCode: String, competition: Competition}>()
);

export const deleteCompetition = createAction(
    '[Competition page] delete Competition',
    props<{competitionCode: String | undefined}>()
);

export const LoadCurrentCompetition = createAction(
    '[Competition page]  load current competition',
    props<{page: Number, size: Number}>()
);
export const LoadFutureCompetitions = createAction(
    '[Competition page]  load future competitions',
    props<{page: Number, size: Number}>()
);
export const LoadClosedCompetitions = createAction(
    '[Competition page]  load closed competitions',
    props<{page: Number, size: Number}>()
);
