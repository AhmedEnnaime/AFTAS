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
    this.store.dispatch(competitionPageActions.enter({page: 0, size: 10} ))
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
    this.store.dispatch(competitionPageActions.enter({page: 0, size: 10} ))
  }

  addCompetition() {
    const competition: Competition = this.competitionForm.value as Competition;
  
    const dateObject = new Date(competition!.date!.toString());
    
    const day = ('0' + dateObject.getDate()).slice(-2);
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const year = dateObject.getFullYear().toString().slice(-2);
    competition.code = (competition.location?.replace(/\s/g, '').substring(0, 3)) + "-" + `${day}-${month}-${year}`;
    competition.endTime = new Date(competition.date + "T" + (competition.endTime?.toString() || "") + ":00");
    competition.startTime = new Date(competition.date + "T" + (competition.startTime?.toString() || "") + ":00");
    this.store.dispatch(competitionPageActions.addCompetition({ competition }));
  }

}
