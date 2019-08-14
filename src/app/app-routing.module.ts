import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events/:id', component: EventsComponent, canActivate: [LoginGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
