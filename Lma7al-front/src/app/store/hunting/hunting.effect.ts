import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as huntingPageActions from "./actions/hunting-page.actions";
import * as huntingApiActions from "./actions/hunting-api.actions";
import { concatMap, exhaustMap, map, mergeMap, switchMap } from "rxjs";
import {HuntingService} from "../../services/hunting.service";

@Injectable()
export class HuntingEffect {

  constructor(private action$: Actions,
              private huntingService: HuntingService){}

  loadHuntings$ = createEffect(() =>
    this.action$.pipe(
      ofType(huntingPageActions.enter),
      exhaustMap(() =>
        this.huntingService
          .getHuntings()
          .pipe(
            map(huntings => huntingApiActions.huntingsLoadedSuccessfully({huntings}))
          )
      )
    )
  );

  createHunting$ = createEffect(() =>
    this.action$.pipe(
      ofType(huntingPageActions.addHunting),
      concatMap((action) =>
        this.huntingService
          .addHunting(action.hunting)
          .pipe(
            map(addedHunting => huntingApiActions.huntingAddedSuccessfully({addedHunting}))
          )
      )
    )
  );

  createBatchHunting$ = createEffect(() =>
    this.action$.pipe(
      ofType(huntingPageActions.addBatchHunting),
      concatMap((action) =>
        this.huntingService
          .addBatchHunting(action.huntings)
          .pipe(
            map(addedBatchHunting => huntingApiActions.batchHuntingAddedSuccessfully({addedBatchHunting}))
          )
      )
    )
  );

  updateFishNumber$ = createEffect(() =>
    this.action$.pipe(
      ofType(huntingPageActions.updateFishNumber),
      concatMap((action) =>
        this.huntingService
          .updateHunting(action.huntingID, action.hunting)
          .pipe(
            map(updatedHunting => huntingApiActions.fishNumberUpdatedSuccessfully({updatedFishNumber: updatedHunting}))
          )
      )
    )
  );

  deleteHunting$ = createEffect(() =>
    this.action$.pipe(
      ofType(huntingPageActions.deleteHunting),
      mergeMap((action) =>
        this.huntingService
          .deleteHunting(action.huntingID)
          .pipe(
            map(response => huntingApiActions.huntingDeletedSuccessfully({message: response.message, huntingID: response.deletedElementIdentifier}))
          )
      )
    )
  );

  loadHuntingDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(huntingPageActions.selectHuntingDetails),
      switchMap((action) =>
        this.huntingService
          .getHuntDetails(action.hunting)
          .pipe(
            map(huntings => huntingApiActions.huntDetailsLoadedSuccessfully({huntings}))
          )
      )
    )
  );

}
