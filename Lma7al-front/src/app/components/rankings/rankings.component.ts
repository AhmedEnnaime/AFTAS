import { Observable } from 'rxjs';
import { CompetitionMember, Ranking } from 'src/app/model/interfaces/ranking.model';
import { Competition } from 'src/app/model/interfaces/competition.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as memberPageActions from "../../store/member/actions/member-page.actions";

import { selectCompetition as selectCompetitionAction } from 'src/app/store/competition/actions/competition-page.actions';

import { selectFoundedCompetition, selectSelectedCompetition } from 'src/app/store/competition/competition.selectors';

import * as rankingPageActoins from './../../store/ranking/actions/ranking-page.actions'
import { findCompetition } from 'src/app/store/competition/actions/competition-page.actions';

import { faCalendarDays, faCheckCircle, faLocationDot, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import {Member} from "../../model/interfaces/member.model";
import {selectMembers} from "../../store/member/member.selectors";
import {selectRankings} from "../../store/ranking/ranking.selectors";
import {DatePipe} from "@angular/common";



@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
})
export class RankingsComponent implements OnInit {
  competition?: Competition;
  competitionCode!: String;
  rankings?: Observable<Ranking[]>;
  memberNum: FormControl;
  locationIcon = faLocationDot;
  dateIcon = faCalendarDays;
  timeIcon = faStopwatch;
  checkIcon = faCheckCircle;
  members?: Observable<Member[]>

  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder, private datePipe: DatePipe) {
    this.route.paramMap.subscribe((params) => {
        this.competitionCode = params.get('id') ?? '';
    });
    this.memberNum = this.fb.control('');

  }

  isCompetitionDatePassed(): boolean {
    if (this.competition && this.competition.date) {
      const competitionDate = new Date(this.competition.date);

      if (!isNaN(competitionDate.getTime())) {
        const currentDate = new Date();
        const formattedCompetitionDate = this.datePipe.transform(competitionDate, 'yyyy-MM-dd');
        const formattedCurrentDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

        if (formattedCompetitionDate !== null && formattedCurrentDate !== null) {
          return formattedCompetitionDate <= formattedCurrentDate;
        }
      }
    }
    return false;
  }


  ngOnInit(): void {
    this.store.dispatch(findCompetition({competitionCode: this.competitionCode}));
    this.store.dispatch(memberPageActions.enter());
    this.members = this.store.select(selectMembers);
    this.store.select(selectFoundedCompetition).subscribe(competition => this.competition = competition);
  }

  addRanking() {
    const ranking: Ranking = {
      id: {
        competitionCode: this.competitionCode,
        memberNum: this.memberNum.value as number
      }
    }

    this.store.dispatch(rankingPageActoins.addRanking({ranking}));
    this.store.dispatch(findCompetition({competitionCode: this.competitionCode}));
  }

  deleteRanking(rankingId: CompetitionMember) {
    this.store.dispatch(rankingPageActoins.deleteRanking({rankingId}));
  }

  setUpCompetitionRankings() {
    this.store.dispatch(rankingPageActoins.setCompetitionRanking({competitionCode: this.competitionCode}));
  }

}
