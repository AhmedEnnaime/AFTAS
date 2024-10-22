import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable, catchError } from 'rxjs';
import { Signin } from '../model/interfaces/Signin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8082/api/auth';
  private fakeUrl: string = "http://localhost:3000"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  //signin

  signin(username:string, password:string):Observable<Signin>{
    return this.http.post<Signin>(`${this.baseUrl}/signin`, {
      username,
      password
    }, this.httpOptions).
    pipe(catchError((error) => this.configService.handleError(error)));
  }

  signinFake():Observable<any>{
    return this.http.get<any>(`${this.fakeUrl}/login`).pipe(catchError((error) => this.configService.handleError(error)));
  }

  //signup

  signup(signup:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/signup`,
    signup, this.httpOptions).
    pipe(catchError((error) => this.configService.handleError(error)));
  }

  //credentiels getter

  getRole():string|null{
    return localStorage.getItem("role");
  }

  getUsername():string|null{
    return localStorage.getItem("username");
  }

  getId():string|null{
    return localStorage.getItem("id");
  }

  getToken():string|null{
    return localStorage.getItem("token");
  }

  //credentiels setter

  setRole(role:string):void{
    localStorage.setItem("role", role);
  }

  setUsername(username: string):void{
    localStorage.setItem("username", username);
  }

  setId(id:string):void{
    localStorage.setItem("id", id);
  }

  setToken(token:string):void{
    localStorage.setItem("token", token);
  }
}
