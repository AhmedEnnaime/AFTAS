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
}
