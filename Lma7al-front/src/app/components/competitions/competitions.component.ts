import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Competition} from "../../model/interfaces/competition.model";
import {Store} from "@ngrx/store";
import {selectCompetitionState, selectCompetitions, selectCurrentPageState, selectPageSize, selectTotalPagesState} from "../../store/competition/competition.selectors";
import * as competitionPageActions from "../../store/competition/actions/competition-page.actions";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompetitionPage } from 'src/app/model/interfaces/CompetitionPage';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
})
export class CompetitionsComponent implements OnInit{
  competitions: Observable<Competition[]>;
  currentPage: Observable<undefined | Number>;
  totalPages: Observable<undefined | Number>;
  pageSize: Observable<undefined | Number>;
  competitionForm: FormGroup;
  selectedCompetitions?: number = 0;

  constructor(private store: Store, private fb: FormBuilder) {
    this.competitions = store.select(selectCompetitions);
    this.currentPage = store.select(selectCurrentPageState);
    this.totalPages = store.select(selectTotalPagesState);
    this.pageSize = store.select(selectPageSize);
    this.competitionForm = fb.group({
      date: [Date.now(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', Validators.required],
      numberOfParticipants: [2, Validators.min(2)],
      amount: [10, Validators.required],
    })
  }

  getCurrentPage(): Number {
    let currentPage: Number | undefined = 0;
    this.currentPage.subscribe(page => currentPage = page);
    return currentPage.valueOf() + 1;
  }

  selectCompetitionType(type: number) {
    this.selectedCompetitions = type;
  }

  getAllCompetitions() {
    this.selectCompetitionType(0);
    this.store.dispatch(competitionPageActions.enter({page: this.getCurrentPage(), size: 10} ))
  }

  getFutureCompetitions() {
    this.selectCompetitionType(1);
    this.store.dispatch(competitionPageActions.LoadFutureCompetitions({page: this.getCurrentPage(), size: 5}))
  }

  getClosedCompetitions() {
    this.selectCompetitionType(2);
    this.store.dispatch(competitionPageActions.LoadClosedCompetitions({page: this.getCurrentPage(), size: 5}))
  }

  getOnGoingCompetitions() {
    this.selectCompetitionType(3);
    this.store.dispatch(competitionPageActions.LoadCurrentCompetition({page: this.getCurrentPage(), size: 5}))
  }

  handleNext() {
    console.log(this.selectedCompetitions);
    if(this.selectedCompetitions == 0) {
      

      this.store.dispatch(competitionPageActions.enter({page: this.getCurrentPage(), size: 10} ))
    }
  }

  handlePrevious() {
    if(this.selectedCompetitions == 0) {
      console.log("zbi");
      this.store.dispatch(competitionPageActions.enter({page: this.getCurrentPage(), size: 10} ))
    }
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
