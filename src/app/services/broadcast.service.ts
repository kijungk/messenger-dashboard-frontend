import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  constructor(private http: HttpClient) { }

  sendBroadcast(text, eventId) {
    const body = {
      text,
      eventId
    }
    return this.http.post('/api/broadcasts', body).subscribe(
      x => console.log('Observer got a next value: ' + x),
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    )
  }
}
