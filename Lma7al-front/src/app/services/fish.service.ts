import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import {ConfigService} from "../config/config.service";
import {Fish} from "../model/interfaces/fish";

@Injectable({
  providedIn: 'root',
})
export class FishService {
  private baseUrl: string = 'http://localhost:9090/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getFishes(): Observable<Fish[]> {
    return this.http
      .get<Fish[]>(`${this.baseUrl}/fishes`)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  deleteFish(name: string | undefined): Observable<{message: String, deletedElementIdentifier: string}> {
    return this.http
      .delete<{message: string, deletedElementIdentifier: string}>(this.baseUrl + '/fishes/' + name, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  getFishByName(name: string): Observable<Fish> {
    return this.http
      .get<Fish>(`${this.baseUrl}/fishes/${name}`)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  addFish(fish: Fish): Observable<Fish> {
    return this.http
      .post<Fish>(`${this.baseUrl}/fishes`, fish, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  updateFish(name: string | undefined, fish: Fish): Observable<Fish> {
    return this.http
      .put<Fish>(`${this.baseUrl}/fishes/${name}`, fish, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }
}
