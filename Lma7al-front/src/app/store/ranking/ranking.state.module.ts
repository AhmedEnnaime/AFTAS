import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { RankingEffect } from "./ranking.effect";
import { MemberReducer } from "../member/member.reducer";


export const RANKING_FEATURE_KEY = 'RANKING'

@NgModule({
    imports: [
        StoreModule.forFeature(RANKING_FEATURE_KEY, MemberReducer),
        EffectsModule.forFeature([RankingEffect])
    ]
})
export class RankingStateModule {}

