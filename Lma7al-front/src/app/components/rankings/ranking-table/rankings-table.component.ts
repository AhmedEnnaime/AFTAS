import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitionMember, Ranking } from 'src/app/model/interfaces/ranking.model';

@Component({
  selector: 'rankings-table',
  templateUrl: './rankings-table.component.html',
})
export class RankingsTableComponent {
    @Input() rankings?: Observable<Ranking[]>;
    @Input() competitionDate?: Date;


    @Output() deleteRanking: EventEmitter<CompetitionMember> = new EventEmitter();

    isRankNull() {
      let bool = false;
      this.rankings?.subscribe(rankings =>
        (rankings[0].rank ?? null == null) ?
        bool = true 
        : bool = false 
      );
      return bool;
    }

    isCompetitionOngoing(){
      let bool = false;
      (new Date(this.competitionDate ?? '' ) == new Date() ) ?
      bool = true : bool = false ;
    }
    
    onDelete(id: CompetitionMember) {
      this.deleteRanking.emit(id);
    }
}
