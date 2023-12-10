import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as levelPageActions from "./actions/level-page.actions";
import * as levelApiActions from "./actions/level.api.actions";
import { concatMap, exhaustMap, map, mergeMap } from "rxjs";
import {LevelService} from "../../services/level.service";

@Injectable()
export class LevelEffect {

  constructor(private action$: Actions,
              private levelService: LevelService){}

  loadLevels$ = createEffect(() =>
    this.action$.pipe(
      ofType(levelPageActions.enter),
      exhaustMap(() =>
        this.levelService
          .getLevels()
          .pipe(
            map(levels => levelApiActions.levelsLoadedSuccessfully({levels}))
          )
      )
    )
  );

  createLevel$ = createEffect(() =>
    this.action$.pipe(
      ofType(levelPageActions.addLevel),
      concatMap((action) =>
        this.levelService
          .addLevel(action.level)
          .pipe(
            map(addedLevel => levelApiActions.levelAddedSuccessfully({addedLevel}))
          )
      )
    )
  );

  updateLevel$ = createEffect(() =>
    this.action$.pipe(
      ofType(levelPageActions.updateLevel),
      concatMap((action) =>
        this.levelService
          .updateLevel(action.levelCode, action.level)
          .pipe(
            map(updatedLevel => levelApiActions.levelUpdatedSuccessfully({updatedLevel}))
          )
      )
    )
  );

  deleteLevel$ = createEffect(() =>
    this.action$.pipe(
      ofType(levelPageActions.deleteLevel),
      mergeMap((action) =>
        this.levelService
          .deleteLevel(action.levelCode)
          .pipe(
            map(response => levelApiActions.levelDeletedSuccessfully({message: response.message, levelCode: response.deletedElementIdentifier}))
          )
      )
    )
  );

}
