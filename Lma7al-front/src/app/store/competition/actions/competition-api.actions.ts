import { createAction, props } from "@ngrx/store";
import { Competition } from "src/app/model/interfaces/competition.model";

export const competitionsLoadedSuccessfully = createAction(
    '[Competition api] Competitions loaded successfully',
    props<{competitions: Competition[]}>()
);

export const competitionsLoadedFailure = createAction(
    '[Competition api] Competitions loaded failure',
    props<{errors: {}}>()
);

export const competitionFoundedSuccessfully = createAction(
    '[Competition api] Competition founded successfully',
    props<{competition: Competition}>()
);

export const competitionFoundedFailure = createAction(
    '[Competition api] Competitions founded failure',
    props<{errors: {}}>()
);

export const competitionsPageLoadedSuccessfully = createAction(
    '[Competition api] Competitions page loaded successfully',
    props<{competitions: Competition[]}>()
);

export const competitionsPageLoadedFailure = createAction(
    '[Competition api] Competitions page loaded failure',
    props<{errors: {}}>()
);

export const competitionAddedSuccessfully = createAction(
    '[Competition api] Competition added successfully',
    props<{addedCompetition: Competition}>()
);

export const competitionAddedFailure = createAction(
    '[Competition api] Competition added failure',
    props<{errors: {}}>()
);

export const competitionUpdatedSuccessfully = createAction(
    '[Competition api] Competition updated successfully',
        props<{updatedCompetition: Competition}>()
);

export const competitionsUpdatedFailure = createAction(
    '[Competition api] Competition updated failure',
    props<{errors: {}}>()
);

export const competitionDeletedSuccessfully = createAction(
    '[Competition api] Competition deletde successfully',
    props<{message: String, competitionCode: String}>()
);

export const competitionDeletedFailure = createAction(
    '[Competition api] Competition deleted failure',
    props<{errors: {}}>()
);

export const currentCompetitionLoadedSuccessfully = createAction(
    '[Competition api] current competition loaded successfully',
    props<{competitions: Competition[]}>()
);

export const currentCompetitionLoadedFailure = createAction(
    '[Competition api] current competition loaded failure',
    props<{errors: {}}>()
);

export const closedCompetitionsLoadedSuccessfully = createAction(
    '[Competition api] closed competitions loaded successfully',
    props<{competitions: Competition[]}>()
);

export const closedCompetitionsLoadedFailure = createAction(
    '[Competition api] closed competitions loaded failure',
    props<{errors: {}}>()
);

export const futureCompetitionsLoadedSuccessfully = createAction(
    '[Competition api] future competitions loaded successfully',
    props<{competitions: Competition[]}>()
);

export const futureCompetitionsLoadedFailure = createAction(
    '[Competition api] future competitions loaded failure',
    props<{errors: {}}>()
);