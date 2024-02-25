import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private route:ActivatedRoute){

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
      text: 'Signin',
      url: '/signin',
      notificationCount: 0,
    },
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
  ]
  ngOnInit(): void {
    let showAuth;
    this.route.data.subscribe(response => {
      showAuth = response['showAuth'];
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
