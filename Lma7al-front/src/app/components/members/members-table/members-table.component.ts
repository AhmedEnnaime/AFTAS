import {Component, Input} from '@angular/core';
import {Member} from "../../../model/interfaces/member.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.css']
})
export class MembersTableComponent {
  @Input() members?: Observable<Member[]>;
}
