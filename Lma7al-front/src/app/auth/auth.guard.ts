import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = Inject(AuthService);
  const router:Router = Inject(Router);
  const {roles} = route.data;
  if(roles.includes(
    authService.getRole()
  )){
    router.navigate(["/"]);
    return true;
  }else{
    return false;
  }
};
