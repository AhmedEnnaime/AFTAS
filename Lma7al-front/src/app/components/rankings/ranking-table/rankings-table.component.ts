import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitionMember, Ranking } from 'src/app/model/interfaces/ranking.model';

@Component({
  selector: 'rankings-table',
  templateUrl: './rankings-table.component.html',
})
export class RankingsTableComponent {
    @Input() rankings?: Observable<Ranking[]>;

    @Output() deleteRanking: EventEmitter<CompetitionMember> = new EventEmitter();

    onDelete(id: CompetitionMember) {
      this.deleteRanking.emit(id);
    }
}
