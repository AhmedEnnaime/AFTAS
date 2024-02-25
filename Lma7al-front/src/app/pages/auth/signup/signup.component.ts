import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar
    ){}

  fg:FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    role: new FormControl(""),
    name: new FormControl(""),
    familyName: new FormControl(""),
    accessionDate: new FormControl(),
    isEnabled: new FormControl(false),
    nationality: new FormControl(""),
    identityDocument: new FormControl(""),
    identityNumber: new FormControl(""),
  });

  ngOnInit(){
  }

  onSubmit(){
    this.authService.signup(this.fg.getRawValue()).subscribe(response => {
      this.router.navigate(["/signin"]);
    }, (error)=>{
      this.snackBar.open(error, "", {
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    });
  }


}
