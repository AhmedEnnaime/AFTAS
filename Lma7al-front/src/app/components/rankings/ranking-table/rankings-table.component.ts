import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitionMember, Ranking } from 'src/app/model/interfaces/ranking.model';

@Component({
  selector: 'rankings-table',
  templateUrl: './rankings-table.component.html',
})
export class RankingsTableComponent {
    @Input() rankings?: Observable<Ranking[]>;
    @Input() competitionStartTime?: Date;
    @Input() competitionEndTime?: Date;


    @Output() deleteRanking: EventEmitter<CompetitionMember> = new EventEmitter();

    isRankNull() {
      let bool = false;
      this.rankings?.subscribe(rankings => {
        if(rankings.length == 0 ) {
          bool = true
          return;
        }
        else if(rankings[0].rank == null) 
          bool = true
      }
      );
      return bool;
    }

    isCompetitionOngoing(){
      let now = new Date().getTime();
      let start = new Date(this.competitionStartTime ?? "").getTime();
      let end = new Date(this.competitionEndTime ?? "").getTime();
      if(now >= start && now <= end)
        return true
      return false
    }
    
    onDelete(id: CompetitionMember) {
      this.deleteRanking.emit(id);
    }
}
