import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as competitionApiActions from './actions/competition-api.actions'
import * as competitionPageActions from './actions/competition-page.actions'
import { CompetitionService } from "src/app/services/competition.service";
import { concatMap, exhaustMap, map } from "rxjs";

@Injectable()
export class CompetitionEffect {

    constructor(private action$: Actions, private competitionService: CompetitionService){}

    loadCompetitions$ = createEffect(() =>
        this.action$.pipe(
            ofType(competitionPageActions.enter,
                   competitionPageActions.getCompetitionPage),
            exhaustMap((action) =>
                this.competitionService
                    .getCompetitions(action.page, action.size)
                    .pipe(map(competitions => competitionApiActions.competitionsLoadedSuccessfully({competitions})))
            )
        )
    );
    loadClosedCompetitions$ = createEffect(() =>
        this.action$.pipe(
            ofType(competitionPageActions.LoadClosedCompetitions),
            exhaustMap((action) =>
                this.competitionService
                    .getClosedCompetitions(action.page, action.size)
                    .pipe(map(competitions => competitionApiActions.closedCompetitionsLoadedSuccessfully({competitions})))
            )
        )
    );
    loadFutureCompetitions$ = createEffect(() =>
        this.action$.pipe(
            ofType(competitionPageActions.LoadFutureCompetitions),
            exhaustMap((action) =>
                this.competitionService
                    .getFutureCompetitions(action.page, action.size)
                    .pipe(map(competitions => competitionApiActions.futureCompetitionsLoadedSuccessfully({competitions})))
            )
        )
    );

    loadCurrentCompetitions$ = createEffect(() =>
        this.action$.pipe(
            ofType(competitionPageActions.LoadCurrentCompetition),
            exhaustMap((action) =>
                this.competitionService
                    .getCurrentCompetitions(action.page, action.size)
                    .pipe(map(competitions => competitionApiActions.currentCompetitionLoadedSuccessfully({competitions})))
            )
        )
    );

    addCompetition$ = createEffect(() =>
        this.action$.pipe(
            ofType(competitionPageActions.addCompetition),
            concatMap((action) => 
                this.competitionService
                    .addCompetition(action.Competition)
                    .pipe(map(addedCompetition => competitionApiActions.competitionAddedSuccessfully({addedCompetition})))
            )
        )
    );

    updateCompetition$ = createEffect(() =>
        this.action$.pipe(
            ofType(competitionPageActions.updateCompetition),
            concatMap((action) => 
                this.competitionService
                    .updateCompetition(action.CompetitionCode, action.Competition)
                    .pipe(map(updatedCompetition => competitionApiActions.competitionUpdatedSuccessfully({updatedCompetition})))
            )
        )
    );

    deleteCompetition$ = createEffect(() =>
        this.action$.pipe(
            ofType(competitionPageActions.deleteCompetition),
            concatMap((action) => 
                this.competitionService
                    .deleteCompetition(action.CompetitionCode)
                    .pipe(map(response => competitionApiActions.competitionDeletedSuccessfully({message: response.message, competitionCode: response.deletedElementIdentifier})))
            )
        )
    );


    
}