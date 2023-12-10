import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { competitionReducer } from "./competition.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CompetitionEffect } from "./comeptition.effect";

export const COMPETITION_FEATURE_KEY = "COMPETITION"

@NgModule({
    imports: [
        StoreModule.forFeature(COMPETITION_FEATURE_KEY, competitionReducer),
        EffectsModule.forFeature([CompetitionEffect])
    ]
})
export class CompetitionModule {}