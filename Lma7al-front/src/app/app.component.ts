import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Member } from './model/interfaces/member.model';
import { selectMembers, selectSelectedMember } from './store/member/member.state';

import * as memberPageActions from "./store/member/actions/member-page.actions"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Lma7al-front';
  members$: Observable<Member[]>;
  selectedMember$: Observable<Member | null>;

  constructor(private store: Store) {
    this.members$ = store.select(selectMembers);
    this.selectedMember$ = store.select(selectSelectedMember);
  }

  ngOnInit(): void {
    this.store.dispatch(memberPageActions.enter());
  }

  deleteMember(num: Number | undefined) {
    this.store.dispatch(memberPageActions.deleteMember({memberNum: num}))
  }
  
}
