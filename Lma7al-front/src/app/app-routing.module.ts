import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CompetitionsPageComponent } from './pages/competitions-page/competitions-page.component';
import { RankingsPageComponent } from './pages/rankings-page/rankings-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomePageComponent , data : {
      roles: []
    }}],
  },
  {
    path: 'signin',
    component: LoginComponent,
    data: {
      showAuth: true
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      showAuth: true
    }
  },
  {
    path: 'competitions',
    component: MainLayoutComponent,
    children: [{ path: '', component: CompetitionsPageComponent, data : {
      roles: []
    }}],
  },
  {
    path: 'competitions/:id',
    component: MainLayoutComponent,
    children: [{ path: '', component: RankingsPageComponent, data : {
      roles: []
    }}],
  },
  {
    path: 'members',
    component: MainLayoutComponent,
    children: [{ path: '', component: DashboardComponent, data : {
      roles: []
    }}],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: MainLayoutComponent,
    children: [{ path: '', component: NotFoundComponent, data : {
      roles: []
    }}],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
