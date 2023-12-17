import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuItems: any[] = [
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
  ];

  ngOnInit(): void {
    this.menuItems = this.menuItems.map((item: any) => {
      return {
        ...item,
        isActive: window.location.pathname === item.url,
      };
    });
  }
}
