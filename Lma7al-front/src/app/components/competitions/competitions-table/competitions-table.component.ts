import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {Competition} from "../../../model/interfaces/competition.model";

@Component({
  selector: 'app-competitions-table',
  templateUrl: './competitions-table.component.html',
  styleUrls: ['./competitions-table.component.css']
})
export class CompetitionsTableComponent {
  @Input() competitions?: Observable<Competition[]>
}
