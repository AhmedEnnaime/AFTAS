import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../config/config.service";
import { Observable, catchError } from "rxjs";
import { Competition } from "../model/interfaces/competition.model";

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {
    private baseUrl: string = "http://localhost:8082/api/competitions";

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      };

      constructor(private http: HttpClient, private configService: ConfigService) {}

      getCompetitions(page?: Number, size?: Number): Observable<Competition[]> {
        return this.http
          .get<Competition[]>(this.baseUrl + `/all?page=${page || 0}&size=${size || 10}`, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }

      getClosedCompetitions(page?: Number, size?: Number): Observable<Competition[]> {
        return this.http
          .get<Competition[]>(this.baseUrl + `/closed?page=${page || 0}&size=${size || 10}`, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }

      getFutureCompetitions(page?: Number, size?: Number): Observable<Competition[]> {
        return this.http
          .get<Competition[]>(this.baseUrl + `/future?page=${page || 0}&size=${size || 10}` , this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }

      getCurrentCompetitions(page?: Number, size?: Number): Observable<Competition[]> {
        return this.http
          .get<Competition[]>(this.baseUrl + `/current?page=${page || 0}&size=${size || 10}`, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }

      deleteCompetition(code: String | undefined): Observable<{message: String, deletedElementIdentifier: String}> {
        return this.http
          .delete<{message: String, deletedElementIdentifier: String}>(this.baseUrl + "/" + code, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }

      addCompetition(competition: Competition): Observable<Competition> {
        return this.http
          .post<Competition>(this.baseUrl, competition, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }

      updateCompetition(code: String, competition: Competition): Observable<Competition> {
        return this.http
          .put<Competition>(this.baseUrl + "/" + code, competition, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }
}
