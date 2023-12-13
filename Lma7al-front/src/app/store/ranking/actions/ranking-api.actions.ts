import { createAction, props } from "@ngrx/store";
import { CompetitionMember, Ranking } from "src/app/model/interfaces/ranking.model";

export const rankingAddedSuccessfully = createAction(
    '[Ranking page] Ranking added successfully',
    props<{ addedRanking: Ranking }>()
);

export const rankingAddedFailure = createAction(
    '[Ranking page] Ranking added failure',
    props<{ message: String }>()
);

export const rankingDeletedSuccsessfully = createAction(
    '[Ranking page]  Ranking deleted successfully',
    props<{ message: String, deletedElementIdentifier: CompetitionMember }>()
);

export const rankingDeletedFailure = createAction(
    '[Ranking page] Ranking deleted failure',
    props<{ message: String }>()
);

export const rankingSetupSuccsesfully = createAction(
    '[Ranking page] Ranking set-up successfully',
    props<{ rankings: Ranking[] }>()
);

export const rankingSetupFailure = createAction(
    '[Ranking page] Ranking set-up failure',
    props<{ message: String }>()
);

export const competitionRankingSuccsesfully = createAction(
    '[Ranking page] Competition ranking  successfully',
    props<{ rankings: Ranking[] }>()
);

export const competitionRankingSetupFailure = createAction(
    '[Ranking page] Competition ranking  failure',
    props<{ message: String }>()
);