import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as fishPageActions from "./actions/fish-page.actions";
import * as fishApiActions from "./actions/fish.api.actions";
import { concatMap, exhaustMap, map, mergeMap } from "rxjs";
import {FishService} from "../../services/fish.service";

@Injectable()
export class FishEffect {

  constructor(private action$: Actions,
              private fishService: FishService){}

  loadFishes$ = createEffect(() =>
    this.action$.pipe(
      ofType(fishPageActions.enter),
      exhaustMap(() =>
        this.fishService
          .getFishes()
          .pipe(
            map(fishes => fishApiActions.fishesLoadedSuccessfully({fishes}))
          )
      )
    )
  );

  createFish$ = createEffect(() =>
    this.action$.pipe(
      ofType(fishPageActions.addFish),
      concatMap((action) =>
        this.fishService
          .addFish(action.fish)
          .pipe(
            map(addedFish => fishApiActions.fishAddedSuccessfully({addedFish}))
          )
      )
    )
  );

  updateFish$ = createEffect(() =>
    this.action$.pipe(
      ofType(fishPageActions.updateFish),
      concatMap((action) =>
        this.fishService
          .updateFish(action.fishName, action.fish)
          .pipe(
            map(updatedFish => fishApiActions.fishUpdatedSuccessfully({updatedFish}))
          )
      )
    )
  );

  deleteFish$ = createEffect(() =>
    this.action$.pipe(
      ofType(fishPageActions.deleteFish),
      mergeMap((action) =>
        this.fishService
          .deleteFish(action.fishName)
          .pipe(
            map(response => fishApiActions.fishDeletedSuccessfully({message: response.message, fishName: response.deletedElementIdentifier}))
          )
      )
    )
  );

}
