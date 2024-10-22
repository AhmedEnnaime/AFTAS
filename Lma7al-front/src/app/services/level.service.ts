import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { Level } from '../model/interfaces/level';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  private baseUrl: string = 'http://localhost:8082/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getLevels(): Observable<Level[]> {
    return this.http
      .get<Level[]>(`${this.baseUrl}/levels`)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  deleteLevel(
    id: number | undefined
  ): Observable<{ message: String; deletedElementIdentifier: number }> {
    return this.http
      .delete<{ message: string; deletedElementIdentifier: number }>(
        this.baseUrl + '/levels/' + id,
        this.httpOptions
      )
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  addLevel(level: Level): Observable<Level> {
    return this.http
      .post<Level>(`${this.baseUrl}/levels`, level, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  updateLevel(id: number | undefined, level: Level): Observable<Level> {
    return this.http
      .put<Level>(`${this.baseUrl}/levels/${id}`, level, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }
}
