import { Injectable } from '@angular/core';
import { Event } from '../classes/event';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  eventsUrl: string = '/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(this.eventsUrl + `/${id}`);
  }
}
