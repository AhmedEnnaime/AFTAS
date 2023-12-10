import { createReducer, createSelector, on } from "@ngrx/store";
import { Member } from "src/app/model/interfaces/member.model";

import * as memberPageActions from "./actions/member-page.actions"
import * as memberAapiActions from "./actions/member-api.actions"

export interface MemberState {
    collection: Member[],
    selectedMemberNum: Number | null;
}

export const initialMemberState: MemberState = {
    collection: [],
    selectedMemberNum: null
}

export const MemberReducer = createReducer(
    initialMemberState,
    on(
        memberPageActions.enter,
        memberPageActions.unselectMembers,
        (state, action) => ({
        ...state,
        selectedMemberNum: null
    })),
    on(memberPageActions.selectMembers, (state, action) => ({
        ...state,
        selectedMemberNum: action.memberNum
    })),
    on(memberAapiActions.membersLoadedSuccessfully, (state, action) => ({
        ...state,
        collection: action.members 
    })),
    on(memberAapiActions.memberAddedSuccessfully, (state, action) => ({
        collection: createMember(state.collection, action.addedMember),
        selectedMemberNum: null
    })),
    on(memberAapiActions.memberUpdatedSuccessfully, (state, action) => ({
        collection: updateMember(state.collection, action.updatedMember),
        selectedMemberNum: null
    })),
    on(memberAapiActions.memberDeletedSuccessfully, (state, action) => ({
        collection: deleteMember(state.collection, action.memberNum),
        selectedMemberNum: null
    })),

);

/**
 * selectors
 */

export const selectAll = (state: MemberState) => state.collection;
export const selectSelectedMemberNum = (state: MemberState) => state.selectedMemberNum;

export const selectSelectedMember = createSelector(
    selectAll,
    selectSelectedMemberNum,
    (members, selectedMemberNum) => members.find(member => member.num === selectedMemberNum) || null
)



/**
 * reducers call back functions
 */


const createMember = (members: Member[], newMember: Member) => [...members, newMember];
const updateMember = (members: Member[], updatedMember: Member) => (
    members.map(
        member => 
                member.num === updatedMember.num 
                ? Object.assign({}, member, updateMember)
                : member     
    )
)
const deleteMember = (members: Member[], memberNum: Number) => members.filter(member => member.num != memberNum);