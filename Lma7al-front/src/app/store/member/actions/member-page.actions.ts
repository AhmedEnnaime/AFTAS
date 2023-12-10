import { createAction, props } from "@ngrx/store";
import { Member } from "src/app/model/interfaces/member.model";

export const enter = createAction('[Member page] enter');

export const selectMembers = createAction(
    '[Member page] select member',
    props<{memberNum: Number}>()
);

export const unselectMembers = createAction('[Member page] unselect member');

export const addMember = createAction(
    '[Member page] add member',
    props<{member: Member}>()
);

export const updateMember = createAction(
    '[Member page] update member',
    props<{memberNum: Number, member: Member}>()
);

export const deleteMember = createAction(
    '[Member page] delete member',
    props<{memberNum: Number | undefined}>()
);

export const filterMembersByName = createAction(
    '[Member page] filter members by name',
    props<{memberName: String}>()
);

export const filterMembersByFamilyName = createAction(
    '[Member page] filter members by family name',
    props<{memberFamilyName: String}>()
);