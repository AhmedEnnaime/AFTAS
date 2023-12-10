import { NgModule } from "@angular/core";
import { ActionReducerMap, MetaReducer, StoreModule, createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromMembers from "./member.reducer"
import { EffectsModule } from "@ngrx/effects";
import { MemberEffect } from "./member.effect";

export const FEATURE_KEY = 'member'

export interface State {
    members: fromMembers.MemberState
}

export const reducers: ActionReducerMap<State> = {
    members: fromMembers.MemberReducer
}

export const metaReducers: MetaReducer<State>[] = [];

@NgModule({
    imports: [StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers }),
              EffectsModule.forFeature([MemberEffect])]
})
export class MemberStateModule {}

export const selectSharedMemberState = createFeatureSelector<State>(FEATURE_KEY);

/**
 * Members selectors
 */
export const selectMemberState = createSelector(
    selectSharedMemberState,
    (membersFeatureState) => membersFeatureState.members
);

export const selectMembers = createSelector(
    selectMemberState,
    fromMembers.selectAll
);

export const selectSelectedMemberNum = createSelector(
    selectMemberState,
    fromMembers.selectSelectedMemberNum
);

export const selectSelectedMember = createSelector(
    selectMemberState,
    fromMembers.selectSelectedMember
)