import { metaReducers } from './modules/core/store/reducers/index';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './modules/core/store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { CharacterEffect } from './modules/core/store/effects/character.effects';
import { ComicEffects } from './modules/core/store/effects/comic.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([CharacterEffect, ComicEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
