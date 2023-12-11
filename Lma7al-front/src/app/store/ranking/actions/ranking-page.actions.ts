import { createAction, props } from "@ngrx/store";
import { CompetitionMember, Ranking } from "src/app/model/interfaces/ranking.model";


export const addRanking = createAction(
    '[Ranking page] add ranking',
    props<{ ranking: Ranking }>()
);

export const deleteRanking = createAction(
    '[Ranking page] delete ranking',
    props<{ rankingId : CompetitionMember }>()
);

export const setCompetitionRanking = createAction(
    '[Ranking page] set competition rankings',
    props<{ competitionCode: String }>()
);