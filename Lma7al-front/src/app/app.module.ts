import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MemberStateModule } from './store/member/member.state.module';
import { MemberEffect } from './store/member/member.effect';
import { HttpClientModule } from '@angular/common/http';
import { LevelEffect } from './store/level/level.effect';
import { LevelStateModule } from './store/level/level.state.module';
import { FishEffect } from './store/fish/fish.effect';
import { FishStateModule } from './store/fish/fish.state.module';
import { CompetitionEffect } from './store/competition/comeptition.effect';
import { CompetitionModule } from './store/competition/competitoin.state.module';
import {HuntingEffect} from "./store/hunting/hunting.effect";
import {HuntingStateModule} from "./store/hunting/hunting.state.module";
import {RankingEffect} from "./store/ranking/ranking.effect";
import {RankingStateModule} from "./store/ranking/ranking.state.module";
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MembersComponent } from './components/members/members.component';
import { MembersTableComponent } from './components/members/members-table/members-table.component';
import {CompetitionsTableComponent} from "./components/competitions/competitions-table/competitions-table.component";
import { CompetitionsPageComponent } from './pages/competitions-page/competitions-page.component';
import {CompetitionsComponent} from "./components/competitions/competitions.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SahredModule } from './shared/shared.module';
import { RankingsPageComponent } from './pages/rankings-page/rankings-page.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { RankingsTableComponent } from './components/rankings/ranking-table/rankings-table.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HuntingComponent } from './components/hunting/hunting.component';
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, NotFoundComponent, DashboardComponent, MembersComponent, MembersTableComponent, CompetitionsComponent, CompetitionsTableComponent, CompetitionsPageComponent, MembersComponent, RankingsPageComponent, HuntingComponent, RankingsComponent, RankingsTableComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
        EffectsModule.forRoot([MemberEffect, LevelEffect, FishEffect, HuntingEffect, CompetitionEffect, RankingEffect]),
        MemberStateModule,
        LevelStateModule,
        FishStateModule,
        CompetitionModule,
        HuntingStateModule,
        RankingStateModule,
        HttpClientModule,
        SahredModule,
        FontAwesomeModule,
        ReactiveFormsModule,
    ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
