import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {Competition} from "../../../model/interfaces/competition.model";
import {Router} from "@angular/router";
import * as competitionPageActions from "../../../store/competition/actions/competition-page.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-competitions-table',
  templateUrl: './competitions-table.component.html',
  styleUrls: ['./competitions-table.component.css']
})
export class CompetitionsTableComponent {
  @Input() competitions?: Observable<Competition[]>
  showDeleteModal: boolean = false;

  constructor(private router: Router, private store: Store) {
  }

  displayDeleteModal() {
    console.log("clicked")
    this.showDeleteModal = true;
    console.log(this.showDeleteModal)
  }

  // deleteCompetition(code: String | undefined) {
  //   this.store.dispatch(
  //     competitionPageActions.deleteCompetition({ CompetitionCode: code })
  //   );
  // }

  navigateToRankings(id: String) {
    this.router.navigate(['/rankings', id]);
  }
}
