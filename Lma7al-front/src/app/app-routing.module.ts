import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {CompetitionsPageComponent} from "./pages/competitions-page/competitions-page.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'competitions',
    component: MainLayoutComponent,
    children: [{ path: '', component: CompetitionsPageComponent }],
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
  exports: [RouterModule]
})
export class AppRoutingModule {}
