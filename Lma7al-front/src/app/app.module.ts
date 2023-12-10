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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([MemberEffect, LevelEffect, FishEffect]),
    EffectsModule.forRoot([MemberEffect, LevelEffect, CompetitionEffect]),
    MemberStateModule,
    LevelStateModule,
    FishStateModule,
    CompetitionModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
