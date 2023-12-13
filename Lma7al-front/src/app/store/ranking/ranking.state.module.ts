import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { RankingEffect } from "./ranking.effect";
import { rankingReducer } from "./ranking.reducer";


export const RANKING_FEATURE_KEY = 'RANKING'

@NgModule({
    imports: [
        StoreModule.forFeature(RANKING_FEATURE_KEY, rankingReducer),
        EffectsModule.forFeature([RankingEffect])
    ]
})
export class RankingStateModule {}

