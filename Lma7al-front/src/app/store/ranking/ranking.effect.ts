import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RankingService } from "src/app/services/ranking.service";

import * as rankingPageActions from './actions/ranking-page.actions'
import * as rankingApiActions from './actions/ranking-api.actions'
import { concatMap, exhaustMap, map, mergeMap } from "rxjs";


@Injectable()
export class RankingEffect {
    
    constructor(private action$: Actions, private rankingService: RankingService){}

    addRanking$ = createEffect(() => 
        this.action$.pipe(
            ofType(rankingPageActions.addRanking),
            concatMap((action) => 
                this.rankingService
                    .addRanking(action.ranking)
                    .pipe(
                        map(addedRanking => {
                            return rankingApiActions.rankingAddedSuccessfully({addedRanking});
                        })
                    )      
            )
        )
    );

    deleteRaking$ = createEffect(() => 
        this.action$.pipe(
            ofType(rankingPageActions.deleteRanking),
            mergeMap((action) => 
                this.rankingService
                    .deleteRanking(action.rankingId)
                    .pipe(
                        map(response => rankingApiActions.rankingDeletedSuccsessfully({message: response.message, deletedElementIdentifier: response.deletedElementIdentifier}))
                    )
            )
        )
    );

    setUpRankings$ = createEffect(() => 
        this.action$.pipe(
            ofType(rankingPageActions.setCompetitionRanking),
            exhaustMap((action) =>
                this.rankingService
                    .getCompetitionRankings(action.competitionCode)
                    .pipe(
                        map(rankings => rankingApiActions.rankingSetupSuccsesfully({rankings}))
                    )
            )
        )
    );

}