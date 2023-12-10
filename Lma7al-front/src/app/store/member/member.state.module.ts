import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MemberEffect } from "./member.effect";
import { MemberReducer } from "./member.reducer";

export const MEMBER_FEATURE_KEY = 'MEMBER'

@NgModule({
    imports: [StoreModule.forFeature(MEMBER_FEATURE_KEY, MemberReducer),
              EffectsModule.forFeature([MemberEffect])
             ]
})
export class MemberStateModule {}


