import {Component, Input} from '@angular/core';
import {Member} from "../../../model/interfaces/member.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
})
export class MembersTableComponent {
  @Input() members?: Observable<Member[]>;
}
