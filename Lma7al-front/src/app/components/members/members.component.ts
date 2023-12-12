import {Component, OnInit} from '@angular/core';
import {Member} from "../../model/interfaces/member.model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectMembers} from "../../store/member/member.selectors";
import * as memberPageActions from "../../store/member/actions/member-page.actions";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{
  members: Observable<Member[]>;
  memberForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.members = store.select(selectMembers);
    this.memberForm = this.fb.group({
      name: ['', Validators.required], 
      familyName: ['', Validators.required],
      nationality: ['', Validators.required],
      identityDocument: ['', Validators.required],
      identityNumber: ['', Validators.required]
    });
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

  addMember() {
    const member: Member = this.memberForm.value as Member;
    this.store.dispatch(memberPageActions.addMember({member}));
  }

}
