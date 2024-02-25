import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private router:Router
    ){
  }

  menuItems: any[] = []
  menuItems1: any[] = [
    {
      text: 'Home',
      url: '/',
      notificationCount: 0,
    },
    {
      text: 'Members',
      url: '/members',
      notificationCount: 4,
    },
    {
      text: 'Competitions',
      url: '/competitions',
      notificationCount: 0,
    },
    {
      text: 'Logout',
      url: '',
      notificationCount: 1
    }
  ];
  menuItems2: any[] = [
    {
      text: 'Signin',
      url: '/signin',
      notificationCount: 0,
    },
    {
      text: 'Signup',
      url: '/signup',
      notificationCount: 4,
    },
  ];

  authenticated = this.authService.getToken();

  onLogout(){
    this.authService.logout();
    this.router.navigate(["/signin"]);
  }
  ngOnInit(): void {
    let showAuth;
    this.route.data.subscribe(response => {
      showAuth = response['showAuth'];
    });
    if(this.authService.getToken() == undefined)
      this.menuItems1.push({
        text: 'Signin',
        url: '/signin',
        notificationCount: 0,
      });
    if(showAuth === true){
      this.menuItems2 = this.menuItems2.map((item: any) => {
        console.log(item);
        return {
          ...item,
          isActive: window.location.pathname === item.url,
        };
      });
      this.menuItems = this.menuItems2;
    }else if(showAuth === undefined){
      this.menuItems1 = this.menuItems1.map((item: any) => {
        return {
          ...item,
          isActive: window.location.pathname === item.url,
        };
      });
      this.menuItems = this.menuItems1;
    }
  }
}
