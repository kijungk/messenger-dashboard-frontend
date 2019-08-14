import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Event } from '../../classes/event';
import { EventsService } from '../../services/events.service';
import { ModalsService } from '../../services/modals.service';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: Observable<Event[]>;
  controller: Object = {
    login: true
  }
  administrator: User;

  constructor(
    private eventsService: EventsService,
    private modalsService: ModalsService,
    private usersService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.controller = this.modalsService.controller;
    this.administrator = this.usersService.administrator;
    this.events = this.getEvents();
  }

  getEvents(): Observable<Event[]> {
    return this.eventsService.getEvents();
  }

  navigateTo(eventId) {
    if (this.administrator.permission === 'vendor' && eventId == 2) {
      return alert('You do not have permissions to view this event');
    }

    return this.router.navigateByUrl('/events/' + eventId);
  }
}
