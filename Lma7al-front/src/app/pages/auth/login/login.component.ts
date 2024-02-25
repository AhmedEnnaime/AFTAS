import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  fg:FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });
  constructor(
    private authService:AuthService,
    private snackBar: MatSnackBar,
    private router: Router
    ){}

  onSubmit(){
    this.authService.signin(this.fg.getRawValue()).subscribe((response: any) =>{

      this.authService.setId(response.userId);
      this.authService.setRole(response.role);
      this.authService.setToken(response.accessToken);
      this.router.navigate(["/competitions"]);
    }, (error)=>{
      this.snackBar.open(error, "", {
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    });
    ;
  }
}
