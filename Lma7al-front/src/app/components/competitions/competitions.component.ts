import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Competition} from "../../model/interfaces/competition.model";
import {Store} from "@ngrx/store";
import {selectCompetitions} from "../../store/competition/competition.selectors";
import * as competitionPageActions from "../../store/competition/actions/competition-page.actions";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit{
  competitions: Observable<Competition[]>;
  competitionForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.competitions = store.select(selectCompetitions);
    this.competitionForm = fb.group({
      date: [Date.now(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', Validators.required],
      numberOfParticipants: [2, Validators.min(2)],
      amount: [10, Validators.required],
    })
  }

  getAllCompetitions() {
    this.store.dispatch(competitionPageActions.enter({page: 0, size: 5} ))
  }

  getFutureCompetitions() {
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

  addCompetition() {
    const competition: Competition = this.competitionForm.value as Competition;
    competition.code = "TES-11-12-23"
    competition.endTime = new Date(competition.date + "T" + competition.endTime + ":00");
    competition.startTime = new Date(competition.date + "T" + competition.startTime + ":00");
    this.store.dispatch(competitionPageActions.addCompetition({competition}));
  }

}
