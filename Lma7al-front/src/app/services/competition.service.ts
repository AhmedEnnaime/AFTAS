import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../config/config.service";
import { Observable, catchError } from "rxjs";
import { Competition } from "../model/interfaces/competition.model";

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {
    private baseUrl: string = "http://localhost:9090/api/competitions/";

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      };
    
      constructor(private http: HttpClient, private configService: ConfigService) {}
    
      getCompetitions(): Observable<Competition[]> {
        return this.http
          .get<Competition[]>(this.baseUrl, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }
    
      deleteCompetition(code: String): Observable<string> {
        return this.http
          .delete<string>(this.baseUrl + code, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }
    
      addCompetition(competition: Competition): Observable<Competition> {
        return this.http
          .post<Competition>(this.baseUrl, competition, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }
    
      updateCompetition(code: String, competition: Competition): Observable<Competition> {
        return this.http
          .put<Competition>(this.baseUrl + code, competition, this.httpOptions)
          .pipe(catchError((error) => this.configService.handleError(error)));
      }
} 