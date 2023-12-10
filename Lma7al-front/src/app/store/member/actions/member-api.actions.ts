import { createAction, props } from "@ngrx/store";
import { Member } from "src/app/model/interfaces/member.model";

export const membersLoadedSuccessfully = createAction(
    '[Member api] member loaded successfully',
    props<{members: Member[]}>()
);

export const membersLoadedFailure = createAction(
    '[Member api] member loaded failure',
    props<{message: String}>()
);

export const memberAddedSuccessfully = createAction(
    '[Member api] member added successfully',
    props<{addedMember: Member}>()
);

export const membersAddedFailure = createAction(
    '[Member api] member added failure',
    props<{message: String}>()
);

export const memberUpdatedSuccessfully = createAction(
    '[Member api] member updated successfully',
    props<{updatedMember: Member}>()
);

export const membersUpdatedFailure = createAction(
    '[Member api] member updated failure',
    props<{message: String}>()
);

export const memberDeletedSuccessfully = createAction(
    '[Member api] member deletde successfully',
    props<{message: String, memberNum: Number}>()
);

export const membersDeletedFailure = createAction(
    '[Member api] member deleted failure',
    props<{message: String}>()
);