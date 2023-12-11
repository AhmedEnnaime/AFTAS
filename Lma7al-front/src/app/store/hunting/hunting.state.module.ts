import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {HuntingEffect} from "./hunting.effect";
import {HuntingReducer} from "./hunting.reducer";

export const HUNTING_FEATURE_KEY = 'HUNTING'

@NgModule({
  imports: [
    StoreModule.forFeature(HUNTING_FEATURE_KEY, HuntingReducer),
    EffectsModule.forFeature([HuntingEffect])
  ]
})
export class HuntingStateModule {}
