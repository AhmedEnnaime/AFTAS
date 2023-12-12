import { Observable } from 'rxjs';
import { CompetitionMember, Ranking } from 'src/app/model/interfaces/ranking.model';
import { Competition } from 'src/app/model/interfaces/competition.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { selectCompetition as selectCompetitionAction } from 'src/app/store/competition/actions/competition-page.actions';

import { selectFoundedCompetition, selectSelectedCompetition } from 'src/app/store/competition/competition.selectors';

import * as rankingPageActoins from './../../store/ranking/actions/ranking-page.actions'
import { findCompetition } from 'src/app/store/competition/actions/competition-page.actions';


@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
})
export class RankingsComponent implements OnInit {
  competition?: Observable<Competition | null>;
  competitionCode!: String;
  rankings: Ranking[] = [];

  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder) {
    this.route.paramMap.subscribe((params) => {
        this.competitionCode = params.get('id') ?? '';
    });
  }


  ngOnInit(): void {
    this.store.dispatch(findCompetition({competitionCode: this.competitionCode}))
    this.competition = this.store.select(selectFoundedCompetition);
  }

  // addRanking() {
  //   this.store.dispatch(rankingPageActoins.addRanking({ranking}))
  // }

  deleteRanking(rankingId: CompetitionMember) {
    this.store.dispatch(rankingPageActoins.deleteRanking({rankingId}));
  }

  setUpCompetitionRankings() {
    this.store.dispatch(rankingPageActoins.setCompetitionRanking({competitionCode: this.competitionCode}));
  }

}