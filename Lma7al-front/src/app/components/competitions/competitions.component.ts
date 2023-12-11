import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Competition} from "../../model/interfaces/competition.model";
import {Store} from "@ngrx/store";
import {selectCompetitions} from "../../store/competition/competition.selectors";
import * as competitionPageActions from "../../store/competition/actions/competition-page.actions";

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit{
  competitions: Observable<Competition[]>;

  constructor(private store: Store) {
    this.competitions = store.select(selectCompetitions)
  }

  getFutureCompetitions() {
    this.store.dispatch(competitionPageActions.enter({page: 0, size: 5} ))
  }

  getAllCompetitions() {
    this.store.dispatch(competitionPageActions.LoadFutureCompetitions({page: 0, size: 5}))
  }

  getClosedCompetitions() {
    this.store.dispatch(competitionPageActions.LoadClosedCompetitions({page: 0, size: 5}))
  }

  getOnGoingCompetitions() {
    this.store.dispatch(competitionPageActions.LoadCurrentCompetition({page: 0, size: 5}))
  }

  ngOnInit() {
    this.store.dispatch(competitionPageActions.enter({page: 0, size: 5} ))
  }

}
