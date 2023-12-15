import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CompetitionMember,
  Ranking,
} from 'src/app/model/interfaces/ranking.model';

@Component({
  selector: 'rankings-table',
  templateUrl: './rankings-table.component.html',
})
export class RankingsTableComponent implements OnInit {
  @Input() rankings?: Observable<Ranking[]>;
  @Input() competitionStartTime?: Date;
  @Input() competitionEndTime?: Date;

  @Output() deleteRanking: EventEmitter<CompetitionMember> = new EventEmitter();

  sortedRankings: Ranking[] = [];

  isRankNull() {
    let bool = false;
    this.rankings?.subscribe((rankings) => {
      if (rankings.length == 0) {
        bool = true;
        return;
      } else if (rankings[0].rank == null) bool = true;
    });
    return bool;
  }

  isCompetitionOngoing() {
    let now = new Date().getTime();
    let start = new Date(this.competitionStartTime ?? '').getTime();
    let end = new Date(this.competitionEndTime ?? '').getTime();

    if (now >= start && now <= end) {
      return true;
    } else {
      return false;
    }
  }

  onDelete(id: CompetitionMember) {
    this.deleteRanking.emit(id);
  }

  ngOnInit(): void {
    this.rankings?.subscribe((data) => {
      this.sortedRankings = data.slice().sort((a, b) => {
        const rankA: number | null =
          a.rank !== null ? (a.rank as number) : null;
        const rankB: number | null =
          b.rank !== null ? (b.rank as number) : null;
        return (rankA || 0) - (rankB || 0);
      });
    });
  }
}
