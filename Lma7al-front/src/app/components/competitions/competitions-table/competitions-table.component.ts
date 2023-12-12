import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {Competition} from "../../../model/interfaces/competition.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-competitions-table',
  templateUrl: './competitions-table.component.html',
})
export class CompetitionsTableComponent {
  @Input() competitions?: Observable<Competition[]>

  constructor(private router: Router) {
  }

  navigateToRankings(id: String) {
    this.router.navigate(['/rankings', id]);
  }
}
