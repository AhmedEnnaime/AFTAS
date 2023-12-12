import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {Competition} from "../../../model/interfaces/competition.model";
import {Router} from "@angular/router";
import * as competitionPageActions from "../../../store/competition/actions/competition-page.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-competitions-table',
  templateUrl: './competitions-table.component.html',
})
export class CompetitionsTableComponent {
  @Input() competitions?: Observable<Competition[]>

  constructor(private router: Router, private store: Store) {
  }

  deleteCompetition(code: String | undefined) {
    this.store.dispatch(
      competitionPageActions.deleteCompetition({ competitionCode: code })
    );
  }

  navigateToRankings(id: String) {
    this.router.navigate(['/rankings', id]);
  }
}
