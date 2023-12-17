import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CompetitionsPageComponent } from './pages/competitions-page/competitions-page.component';
import { RankingsPageComponent } from './pages/rankings-page/rankings-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomePageComponent }],
  },
  {
    path: 'competitions',
    component: MainLayoutComponent,
    children: [{ path: '', component: CompetitionsPageComponent }],
  },
  {
    path: 'competitions/:id',
    component: MainLayoutComponent,
    children: [{ path: '', component: RankingsPageComponent }],
  },
  {
    path: 'members',
    component: MainLayoutComponent,
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: MainLayoutComponent,
    children: [{ path: '', component: NotFoundComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
