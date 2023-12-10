import { createReducer, createSelector, on } from "@ngrx/store";
import { Member } from "src/app/model/interfaces/member.model";

import * as memberPageActions from "./actions/member-page.actions"
import * as memberApiActions from "./actions/member-api.actions"

export interface MemberState {
    collection: Member[],
    selectedMemberNum: Number | null;
    loading: boolean;
    errors: {}
}

const initialMemberState: MemberState = {
    collection: [],
    selectedMemberNum: null,
    loading: false,
    errors: {}
}

export const MemberReducer = createReducer(
    initialMemberState,
    on(
        memberPageActions.enter,
        memberPageActions.filterMembersByName,
        memberPageActions.filterMembersByFamilyName,
        (state, action) => ({
        ...state,
        selectedMemberNum: null,
        loading: true,
    })),
    on(memberPageActions.unselectMembers,
       (state, action) => ({
        ...state,
        selectedMemberNum: null,
    })),
    on(memberPageActions.selectMember, (state, action) => ({
        ...state,
        selectedMemberNum: action.memberNum
    })),
    on(memberApiActions.membersLoadedSuccessfully,
       memberApiActions.membersByFamilyNameLoadedSuccessfully,
       memberApiActions.membersByNameLoadedSuccessfully,
       (state, action) => ({
        ...state,
        collection: action.members 
    })),
    on(memberPageActions.addMember,
       memberPageActions.updateMember,
       memberPageActions.deleteMember,
        (state, action) => ({
            ...state,
            loading: true
        })
    ),
    on(memberApiActions.memberAddedSuccessfully, (state, action) => ({
        collection: createMember(state.collection, action.addedMember),
        selectedMemberNum: null,
        errors: {},
        loading: false
    })),
    on(memberApiActions.memberUpdatedSuccessfully, (state, action) => ({
        collection: updateMember(state.collection, action.updatedMember),
        selectedMemberNum: null,
        errors: {},
        loading: false
    })),
    on(memberApiActions.memberDeletedSuccessfully, (state, action) => ({
        collection: deleteMember(state.collection, action.memberNum),
        selectedMemberNum: null,
        errors: {},
        loading: false
    })),
    on(memberApiActions.membersAddedFailure,
       memberApiActions.membersUpdatedFailure,
       memberApiActions.membersByFamilyNameLoadedFailure,
       memberApiActions.membersByNameLoadedFailure,
       memberApiActions.membersDeletedFailure,
       memberApiActions.membersLoadedFailure,
       (state, action) => ({
        ...state,
        loading: false,
        errors: action.errors
       })
    )

);


/**
 * reducers call back functions
 */


const createMember = (members: Member[], newMember: Member) => [...members, newMember];
const updateMember = (members: Member[], updatedMember: Member) => (
    members.map(
        member => 
                member.num === updatedMember.num 
                ? Object.assign({}, member, updatedMember)
                : member
    )
)
const deleteMember = (members: Member[], memberNum: Number) => members.filter(member => member.num != memberNum);