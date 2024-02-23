import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private authService:AuthService){}

  onSubmit(){
    this.authService.signinFake().subscribe((response: any) =>{
      console.log(response.token);

      this.authService.setId(response.id);
      this.authService.setRole(response.role);
      this.authService.setToken(response.token);
    });
  }
}
