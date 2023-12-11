import {Component, OnInit} from '@angular/core';
import {Member} from "../../model/interfaces/member.model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectMembers} from "../../store/member/member.selectors";
import * as memberPageActions from "../../store/member/actions/member-page.actions";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{
  members: Observable<Member[]>;

  constructor(private store: Store) {
    this.members = store.select(selectMembers)
  }

  searchForMember(event: any) {
    if(event.value == "") {
      this.store.dispatch(memberPageActions.enter());
      return
    }
    this.store.dispatch(memberPageActions.filterMembersByName({memberName: event.value}))
  }
  ngOnInit() {
    this.store.dispatch(memberPageActions.enter());
  }

}
