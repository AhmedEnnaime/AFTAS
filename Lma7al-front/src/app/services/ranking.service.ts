import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../config/config.service";
import { Observable, catchError } from "rxjs";
import { CompetitionMember, Ranking } from "../model/interfaces/ranking.model";

@Injectable({
    providedIn: 'root'
})
export class RankingService {
    private baseUrl: string = "http://localhost:8082/api/rankings/";

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      };

      constructor(private http: HttpClient, private configService: ConfigService) {}

      getRankings(): Observable<Ranking[]> {
        return this.http
          .get<Ranking[]>(this.baseUrl, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }

      getCompetitionRankings(competitionCode: String): Observable<Ranking[]> {
        return this.http
          .get<Ranking[]>(this.baseUrl + "competition/" + competitionCode, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }

      deleteRanking(identifier: CompetitionMember): Observable<{message: String, deletedElementIdentifier: CompetitionMember}> {
        return this.http
          .delete<{message: String, deletedElementIdentifier: CompetitionMember}>(this.baseUrl + "competition/" + identifier.competitionCode + "/member/" + identifier.memberNum , this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }

      addRanking(ranking: Ranking): Observable<Ranking> {
        return this.http
          .post<Ranking>(this.baseUrl, ranking, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }

      updateRanking(identifier: CompetitionMember, ranking: Ranking): Observable<Ranking> {
        return this.http
          .put<Ranking>(this.baseUrl + "competition/" + identifier.competitionCode + "/member/" + identifier.memberNum, ranking, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }


}
