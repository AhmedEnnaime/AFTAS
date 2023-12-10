import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {FishReducer} from "./fish.reducer";
import {FishEffect} from "./fish.effect";

export const FISH_FEATURE_KEY = 'FISH'

@NgModule({
  imports: [StoreModule.forFeature(FISH_FEATURE_KEY, FishReducer),
    EffectsModule.forFeature([FishEffect])
  ]
})
export class FishStateModule {}
