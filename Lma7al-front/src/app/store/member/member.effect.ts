import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MemberService } from "src/app/services/member.service";

import * as memberPageActions from "./actions/member-page.actions";
import * as memberApiActions from "./actions/member-api.actions";
import { concatMap, exhaustMap, map, mergeMap } from "rxjs";

@Injectable()
export class MemberEffect {

    constructor(private action$: Actions,
                private memberService: MemberService){}
    
    loadMembers$ = createEffect(() =>
        this.action$.pipe(
            ofType(memberPageActions.enter),
            exhaustMap(() => 
                this.memberService
                    .getMembers()
                    .pipe(
                        map(members => memberApiActions.membersLoadedSuccessfully({members}))
                    )
            )
        )
    );

    createMember$ = createEffect(() =>
        this.action$.pipe(
            ofType(memberPageActions.addMember),
            concatMap((action) => 
                this.memberService
                    .addMember(action.member)
                    .pipe(
                        map(addedMember => memberApiActions.memberAddedSuccessfully({addedMember}))
                    )
            )
        )
    );

    updateMember$ = createEffect(() =>
        this.action$.pipe(
            ofType(memberPageActions.updateMember),
            concatMap((action) => 
                this.memberService
                    .updateMember(action.memberNum, action.member)
                    .pipe(
                        map(updatedMember => memberApiActions.memberUpdatedSuccessfully({updatedMember}))
                    )
            )
        )
    );

    deleteMember$ = createEffect(() =>
        this.action$.pipe(
            ofType(memberPageActions.deleteMember),
            mergeMap((action) => 
                this.memberService
                    .deleteMember(action.memberNum)
                    .pipe(
                        map(response => memberApiActions.memberDeletedSuccessfully({message: response.message, memberNum: response.deletedElementIdentifier}))
                    )
            )
        )
    );


}