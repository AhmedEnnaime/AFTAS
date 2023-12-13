import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../config/config.service";
import {catchError, Observable} from "rxjs";
import {Fish} from "../model/interfaces/fish";
import {Hunting} from "../model/interfaces/hunting";
import { CompetitionMember } from '../model/interfaces/ranking.model';

@Injectable({
  providedIn: 'root'
})
export class HuntingService {

  private baseUrl: string = 'http://localhost:9090/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getHuntings(): Observable<Hunting[]> {
    return this.http
      .get<Hunting[]>(`${this.baseUrl}/hunting`)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  deleteHunting(id: number | undefined): Observable<{message: string, deletedElementIdentifier: number}> {
    return this.http
      .delete<{message: string, deletedElementIdentifier: number}>(this.baseUrl + '/hunting/' + id, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  getHuntingByID(id: number): Observable<Hunting> {
    return this.http
      .get<Hunting>(`${this.baseUrl}/hunting/${id}`)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  addHunting(hunting: Hunting): Observable<Hunting> {
    return this.http
      .post<Hunting>(`${this.baseUrl}/hunting`, hunting, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  addBatchHunting(huntings: Hunting[]): Observable<Hunting[]> {
    return this.http
      .post<Hunting[]>(`${this.baseUrl}/hunting/batch`, huntings, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  updateHunting(id: number | undefined, hunting: Hunting): Observable<Hunting> {
    return this.http
      .patch<Hunting>(`${this.baseUrl}/hunting/${id}`, hunting, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  getHuntDetails(specific: CompetitionMember): Observable<Hunting[]> {
    return this.http
      .post<Hunting[]>(`${this.baseUrl}/hunting/specific`, {competition_code: specific.competitionCode, member_num: specific.memberNum}, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }
}
