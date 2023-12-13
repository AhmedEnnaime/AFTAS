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
  currentPage: number | undefined | Number;
  totalPages: number | undefined | Number;
  pageSize: Observable<undefined | Number>;
  competitionForm: FormGroup;
  selectedCompetitions?: Number = 0;

  constructor(private store: Store, private fb: FormBuilder) {
    this.competitions = store.select(selectCompetitions);
    store.select(selectCurrentPageState).subscribe((page) => (this.currentPage = page));
    store.select(selectTotalPagesState).subscribe((total) => (this.totalPages = total));
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

  selectCompetitionType(type: number) {
    this.selectedCompetitions = type;
  }

  getAllCompetitions() {
    this.selectCompetitionType(0);
    this.store.dispatch(competitionPageActions.enter({page: 0, size: 10} ))
  }

  getFutureCompetitions() {
    this.selectCompetitionType(1);
    this.selectedCompetitions = 1;
    this.store.dispatch(competitionPageActions.LoadFutureCompetitions({page: 0, size: 5}))
  }

  getClosedCompetitions() {
    this.selectCompetitionType(2);
    this.selectedCompetitions = 2;
    this.store.dispatch(competitionPageActions.LoadClosedCompetitions({page: 0, size: 5}))
  }

  getOnGoingCompetitions() {
    this.selectCompetitionType(3);
    this.selectedCompetitions = 3;
    this.store.dispatch(competitionPageActions.LoadCurrentCompetition({page: 0, size: 5}))
  }

  handleNext() {
    console.log('Selected competitions ' + this.currentPage);
    console.log('Total Pages ' + this.totalPages);
    const currentPageValue = Number(this.currentPage?.valueOf()) || 0;

    if (this.selectedCompetitions == 0 && currentPageValue + 1 < (this.totalPages! as number)) {
      console.log('competitions page of all ' + this.currentPage);
      this.store.dispatch(
        competitionPageActions.enter({ page: ((this.currentPage?.valueOf() ?? 0) + 1) as number, size: 10 })
      );
    } else if (this.selectedCompetitions == 1 && this.currentPage! < this.totalPages!) {
      console.log('competitions page of future ' + this.currentPage);
      this.store.dispatch(
        competitionPageActions.LoadFutureCompetitions({
          page: ((this.currentPage?.valueOf() ?? 0) + 1) as number,
          size: 5,
        })
      );
    } else if (this.selectedCompetitions == 2 && this.currentPage! < this.totalPages!) {
      console.log('competitions page of closed ' + this.currentPage);
      this.store.dispatch(
        competitionPageActions.LoadClosedCompetitions({
          page: ((this.currentPage?.valueOf() ?? 0) + 1) as number,
          size: 5,
        })
      );
    } else if (this.selectedCompetitions == 3 && this.currentPage! < this.totalPages!) {
      console.log('competitions page of current ' + this.currentPage);
      this.store.dispatch(
        competitionPageActions.LoadCurrentCompetition({
          page: ((this.currentPage?.valueOf() ?? 0) + 1) as number,
          size: 5,
        })
      );
    }
  }

  handlePrevious() {
    console.log('Selected competitions ' + this.currentPage);
    console.log('Total Pages ' + this.totalPages);

    const currentPageValue = this.currentPage?.valueOf() || 0;

    if (this.selectedCompetitions == 0 && currentPageValue > 0) {
      this.store.dispatch(
        competitionPageActions.enter({ page: currentPageValue - 1, size: 10 })
      );
    } else if (this.selectedCompetitions == 1 && currentPageValue > 0) {
      this.store.dispatch(
        competitionPageActions.LoadFutureCompetitions({
          page: currentPageValue - 1,
          size: 5,
        })
      );
    } else if (this.selectedCompetitions == 2 && currentPageValue > 0) {
      this.store.dispatch(
        competitionPageActions.LoadClosedCompetitions({
          page: currentPageValue - 1,
          size: 5,
        })
      );
    } else if (this.selectedCompetitions == 3 && currentPageValue > 0) {
      this.store.dispatch(
        competitionPageActions.LoadCurrentCompetition({
          page: currentPageValue - 1,
          size: 5,
        })
      );
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
