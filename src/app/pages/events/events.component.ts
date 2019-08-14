import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from '../../classes/event';
import { EventsService } from '../../services/events.service';
import { ModalsService } from '../../services/modals.service';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  id: string;
  event: Observable<Event>;
  controller: Object = {
    broadcast: false,
    orders: false,
  };
  menuController: Object = {
    ordersMenu: false
  }
  administrator: User;

  constructor(
    private eventsService: EventsService,
    private modalsService: ModalsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    this.administrator = this.userService.administrator;
    this.controller = this.modalsService.controller;

    if (Number(this.id) === 1) {
      this.menuController['ordersMenu'] = true
    }

    this.event = this.getEvent(this.id);
  }

  getEvent(id) {
    return this.eventsService.getEvent(id);
  }

  open(modal) {
    return this.modalsService.toggleModal(modal);
  }
}
