import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  controller: Object = {
    orders: false,
    broadcast: false,
    login: true
  }

  constructor() { }

  toggleModal(modal) {
    this.controller[modal] = !this.controller[modal];
    return;
  }
}
