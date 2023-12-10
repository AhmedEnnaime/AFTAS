import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MemberState } from "./member.reducer";
import { MEMBER_FEATURE_KEY } from "./member.state.module";

export const selectMemberState = createFeatureSelector<MemberState>(MEMBER_FEATURE_KEY);

/**
 * Local selectors
 */

const getAllMembers = (state: MemberState) => state.collection;
const getSelectedMemberNum = (state: MemberState) => state.selectedMemberNum;
const getErros = (state: MemberState) => state.errors
const getLoadingState = (state: MemberState) => state.loading

const getSelectedMember = createSelector(
    getAllMembers,
    getSelectedMemberNum,
    (members, selectedMemberNum) => members.find(member => member.num === selectedMemberNum) || null
);

/**
 * Global selectors
 */
export const selectMembers = createSelector(
    selectMemberState,
    getAllMembers
);

export const selectSelectedMemberNum = createSelector(
    selectMemberState,
    getSelectedMemberNum
);

export const selectSelectedMember = createSelector(
    selectMemberState,
    getSelectedMember
);

export const selectLoadingState = createSelector(
    selectMemberState,
    getLoadingState
);

export const selectErrorState = createSelector(
    selectMemberState,
    getErros
);