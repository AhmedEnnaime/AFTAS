import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking } from 'src/app/model/interfaces/ranking.model';

@Component({
  selector: 'rankings-table',
  templateUrl: './rankings-table.component.html',
})
export class RankingsTableComponent {
    @Input() rankings: Ranking[] = [];
}