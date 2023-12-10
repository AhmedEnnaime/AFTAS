import { createAction, props } from "@ngrx/store";
import { Member } from "src/app/model/interfaces/member.model";

export const membersLoadedSuccessfully = createAction(
    '[Member api] member loaded successfully',
    props<{members: Member[]}>()
);

export const membersLoadedFailure = createAction(
    '[Member api] member loaded failure',
    props<{errors: {}}>()
);

export const memberAddedSuccessfully = createAction(
    '[Member api] member added successfully',
    props<{addedMember: Member}>()
);

export const membersAddedFailure = createAction(
    '[Member api] member added failure',
    props<{errors: {}}>()
);

export const memberUpdatedSuccessfully = createAction(
    '[Member api] member updated successfully',
    props<{updatedMember: Member}>()
);

export const membersUpdatedFailure = createAction(
    '[Member api] member updated failure',
    props<{errors: {}}>()
);

export const memberDeletedSuccessfully = createAction(
    '[Member api] member deletde successfully',
    props<{message: String, memberNum: Number}>()
);

export const membersDeletedFailure = createAction(
    '[Member api] member deleted failure',
    props<{errors: {}}>()
);

export const membersByNameLoadedSuccessfully = createAction(
    '[Member api] member by name loaded successfully',
    props<{members: Member[]}>()
);

export const membersByNameLoadedFailure = createAction(
    '[Member api] member by name loaded failure',
    props<{errors: {}}>()
);

export const membersByFamilyNameLoadedSuccessfully = createAction(
    '[Member api] member by family name loaded successfully',
    props<{members: Member[]}>()
);

export const membersByFamilyNameLoadedFailure = createAction(
    '[Member api] member by family name loaded failure',
    props<{errors: {}}>()
);