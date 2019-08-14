import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalsService } from '../../services/modals.service';
import { BroadcastService } from '../../services/broadcast.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
  text: string;

  constructor(
    private route: ActivatedRoute,
    private broadcastService: BroadcastService,
    private modalsService: ModalsService
  ) { }

  ngOnInit() {
    this.text = '';
  }

  close(event) {
    event.preventDefault();

    this.text = '';
    this.modalsService.toggleModal('broadcast');

    return;
  }

  sendBroadcast(event) {
    event.preventDefault();
    const eventId = this.route.snapshot.params.id;

    this.broadcastService.sendBroadcast(this.text, eventId)

    return this.close(event);
  }
}
