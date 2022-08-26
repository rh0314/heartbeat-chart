import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeartbeatComponent } from './heartbeat/heartbeat.component';
import { ChartsModule } from 'ng2-charts';
import { StaticHeartbeatComponent } from './static-heartbeat/static-heartbeat.component';

@NgModule({
  declarations: [
    AppComponent,
    HeartbeatComponent,
    StaticHeartbeatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
