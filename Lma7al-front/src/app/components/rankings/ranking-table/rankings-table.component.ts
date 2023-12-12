import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking } from 'src/app/model/interfaces/ranking.model';

@Component({
  selector: 'rankings-table',
  templateUrl: './rankings-table.component.html',
})
export class RankingsTableComponent {
    @Input() rankings: Ranking[] = [
      {
      id: {competitionCode: "TES-11-111", memberNum: 12},
      member: {
        name: "hamza",
        familyName: "essouli"
      },
      score: 100,
      rank: 1
    },
    {
      id: {competitionCode: "TES-11-111", memberNum: 12},
      member: {
        name: "hamza",
        familyName: "essouli"
      },
      score: 100,
      rank: 2
    },
    {
      id: {competitionCode: "TES-11-111", memberNum: 12},
      member: {
        name: "hamza",
        familyName: "essouli"
      },
      score: 100,
      rank: 3
    }
  ];
}