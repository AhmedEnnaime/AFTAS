import { createAction, props } from "@ngrx/store";
import { Competition } from "src/app/model/interfaces/competition.model";

export const enter = createAction('[Competition page] enter');

export const selectCompetition = createAction(
    '[Competition page] select Competitions',
    props<{competitionCode: String}>()
);

export const unselectCompetition = createAction('[Competition page] unselect Competition');

export const addCompetition = createAction(
    '[Competition page] add Competition',
    props<{Competition: Competition}>()
);

export const updateCompetition = createAction(
    '[Competition page] update Competition',
    props<{CompetitionCode: String, Competition: Competition}>()
);

export const deleteCompetition = createAction(
    '[Competition page] delete Competition',
    props<{CompetitionCode: String | undefined}>()
);

export const LoadCurrentCompetition = createAction('[Competition page]  load current competition');
export const LoadFutureCompetitions = createAction('[Competition page]  load future competitions');
export const LoadClosedCompetitions = createAction('[Competition page]  load closed competitions');