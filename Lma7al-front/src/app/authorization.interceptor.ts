import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes("auth")){
      return next.handle(request);
    }
    const modifiedRequest = request.clone({
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.authService.getToken()}`
      }),
    });
    return next.handle(modifiedRequest);
  }
}
