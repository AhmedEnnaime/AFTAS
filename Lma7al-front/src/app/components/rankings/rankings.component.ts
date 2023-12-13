import { Observable } from 'rxjs';
import { CompetitionMember, Ranking } from 'src/app/model/interfaces/ranking.model';
import { Competition } from 'src/app/model/interfaces/competition.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { selectCompetition as selectCompetitionAction } from 'src/app/store/competition/actions/competition-page.actions';

import { selectFoundedCompetition, selectSelectedCompetition } from 'src/app/store/competition/competition.selectors';

import * as rankingPageActoins from './../../store/ranking/actions/ranking-page.actions'
import { findCompetition } from 'src/app/store/competition/actions/competition-page.actions';

import { faCalendarDays, faCheckCircle, faLocationDot, faStopwatch } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
})
export class RankingsComponent implements OnInit {
  competition?: Competition;
  competitionCode!: String;
  rankings: Ranking[] = [];
  memberNum: FormControl;
  locationIcon = faLocationDot;
  dateIcon = faCalendarDays;
  timeIcon = faStopwatch;
  checkIcon = faCheckCircle;

  
  

  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder) {
    this.route.paramMap.subscribe((params) => {
        this.competitionCode = params.get('id') ?? '';
    });
    this.memberNum = this.fb.control('');
    
  }


  ngOnInit(): void {
    this.store.dispatch(findCompetition({competitionCode: this.competitionCode}))
    this.store.select(selectFoundedCompetition).subscribe(competition => this.competition = competition);
  }

  addRanking() {
    const ranking: Ranking = {
      id: {
        competitionCode: this.competitionCode,
        memberNum: this.memberNum.value as Number
      }
    }
    console.log("component: " +ranking.id.competitionCode);
    
    this.store.dispatch(rankingPageActoins.addRanking({ranking}))
  }

  deleteRanking(rankingId: CompetitionMember) {
    this.store.dispatch(rankingPageActoins.deleteRanking({rankingId}));
  }

  setUpCompetitionRankings() {
    this.store.dispatch(rankingPageActoins.setCompetitionRanking({competitionCode: this.competitionCode}));
  }

}