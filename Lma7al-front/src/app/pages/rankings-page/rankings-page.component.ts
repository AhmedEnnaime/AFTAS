import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Competition } from 'src/app/model/interfaces/competition.model';
import { Ranking } from 'src/app/model/interfaces/ranking.model';
import { selectCompetition as selectCompetitionAction } from 'src/app/store/competition/actions/competition-page.actions';
import { selectSelectedCompetition } from 'src/app/store/competition/competition.selectors';


@Component({
  selector: 'app-rankings-page',
  templateUrl: './rankings-page.component.html',
})
export class RankingsPageComponent implements OnInit {
  competition: Observable<Competition | null>;
  competitionCode!: String;
  rankings?: Observable<Ranking[] | null>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.competition = store.select(selectSelectedCompetition);
  }

  ngOnInit(): void {
    this.store.dispatch(selectCompetitionAction({competitionCode: this.competitionCode}));
  }

}
