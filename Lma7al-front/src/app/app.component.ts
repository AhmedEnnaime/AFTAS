import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Member } from './model/interfaces/member.model';
import {
  selectMembers,
  selectSelectedMember,
} from './store/member/member.selectors';

import * as memberPageActions from './store/member/actions/member-page.actions';
import * as levelPageActions from './store/level/actions/level-page.actions';
import * as fishPageActions from './store/fish/actions/fish-page.actions';
import * as competitionPageActions from './store/competition/actions/competition-page.actions';
import * as huntingPageActions from './store/hunting/actions/hunting-page.actions';
import * as rankingPageActions from './store/ranking/actions/ranking-page.actions'

import { Level } from './model/interfaces/level';
import {
  selectLevels,
  selectSelectedLevel,
} from './store/level/level.selectors';
import { Fish } from './model/interfaces/fish';
import { selectFishes, selectSelectedFish } from './store/fish/fish.selectors';
import { Competition } from './model/interfaces/competition.model';
import {
  selectCompetitions,
  selectSelectedCompetitoin,
} from './store/competition/competition.selectors';
import {Hunting} from "./model/interfaces/hunting";
import {selectHuntings, selectSelectedHunting} from "./store/hunting/hunting.selectors";
import { Ranking } from './model/interfaces/ranking.model';
import { selectRankings, selectSelectedRanking } from './store/ranking/ranking.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Lma7al-front';
  // members$: Observable<Member[]>;
  // levels$: Observable<Level[]>;
  // fishes$: Observable<Fish[]>;
  // competitions$: Observable<Competition[]>;
  // huntings$: Observable<Hunting[]>;
  // rankings$: Observable<Ranking[]>;
  //
  // selectedMember$: Observable<Member | null>;
  // selectedLevel$: Observable<Level | null>;
  // selectedFish$: Observable<Fish | null>;
  // selectedCompetition$: Observable<Competition | null>;
  // selectedHunting$: Observable<Hunting | null>;
  // selectedRanking$: Observable<Ranking | null>
  //
  // constructor(private store: Store) {
  //   this.members$ = store.select(selectMembers);
  //   this.selectedMember$ = store.select(selectSelectedMember);
  //   this.selectedLevel$ = store.select(selectSelectedLevel);
  //   this.levels$ = store.select(selectLevels);
  //   this.fishes$ = store.select(selectFishes);
  //   this.selectedFish$ = store.select(selectSelectedFish);
  //   this.selectedCompetition$ = store.select(selectSelectedCompetitoin);
  //   this.competitions$ = store.select(selectCompetitions);
  //   this.huntings$ = store.select(selectHuntings);
  //   this.selectedHunting$ = store.select(selectSelectedHunting);
  //   this.rankings$ = store.select(selectRankings);
  //   this.selectedRanking$ = store.select(selectSelectedRanking);
  // }
  //
  // ngOnInit(): void {
  //   this.store.dispatch(memberPageActions.enter());
  //   this.store.dispatch(levelPageActions.enter());
  //   this.store.dispatch(fishPageActions.enter());
  //   this.store.dispatch(competitionPageActions.enter());
  //   this.store.dispatch(huntingPageActions.enter());
  // }
  //
  // deleteMember(num: Number | undefined) {
  //   this.store.dispatch(memberPageActions.deleteMember({ memberNum: num }));
  // }
  //
  // deleteLevel(code: number | undefined) {
  //   this.store.dispatch(levelPageActions.deleteLevel({ levelCode: code }));
  // }
  //
  // deleteFish(name: string | undefined) {
  //   this.store.dispatch(fishPageActions.deleteFish({ fishName: name }));
  // }
  //
  // deleteCompetition(code: String | undefined) {
  //   this.store.dispatch(
  //     competitionPageActions.deleteCompetition({ CompetitionCode: code })
  //   );
  // }
  //
  // deleteHunting(id: number | undefined) {
  //   this.store.dispatch(huntingPageActions.deleteHunting({ huntingID: id }));
  // }
}
