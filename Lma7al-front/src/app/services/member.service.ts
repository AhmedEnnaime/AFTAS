import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable, catchError } from 'rxjs';
import { Member } from '../model/interfaces/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl: string = 'http://localhost:8082/api/members';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getMembers(): Observable<Member[]> {
    return this.http
      .get<Member[]>(this.baseUrl, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  getMembersByName(name: String): Observable<Member[]> {
    return this.http
      .get<Member[]>(this.baseUrl + '/name/' + name, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  getMembersByFamilyName(familyName: String): Observable<Member[]> {
    return this.http
      .get<Member[]>(
        this.baseUrl + '/family-name/' + familyName,
        this.httpOptions
      )
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  deleteMember(
    num: Number | undefined
  ): Observable<{ message: String; deletedElementIdentifier: Number }> {
    return this.http
      .delete<{ message: string; deletedElementIdentifier: Number }>(
        this.baseUrl + '/' + num,
        this.httpOptions
      )
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  addMember(member: Member): Observable<Member> {
    return this.http
      .post<Member>(this.baseUrl, member, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  updateMember(num: Number, member: Member): Observable<Member> {
    return this.http
      .put<Member>(this.baseUrl + '/' + num, member, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }
}
