import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeartbeatComponent } from './heartbeat/heartbeat.component';
import { StaticHeartbeatComponent } from './static-heartbeat/static-heartbeat.component';

const routes: Routes = [
  { path: 'heartbeat', component: HeartbeatComponent },
  { path: 'static-heartbeat', component: StaticHeartbeatComponent },
  { path: '*', redirectTo: '/heartbeat' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
