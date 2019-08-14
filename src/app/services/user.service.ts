import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  administrator: User = new User();

  credentials: Object = {
    superuser: 'savestheday',
    fritz: 'coffeeandbread',
    altdif: 'teaandlife'
  }

  constructor() { }

  login(credentials) {
    if (this.credentials[credentials.username] === credentials.password) {
      this.administrator.username = credentials.username;

      switch (credentials.username) {
        case 'fritz':
          this.administrator.permission = 'vendor';
          this.administrator.vendor_id = 1;
          break;

        case 'altdif':
          this.administrator.permission = 'vendor';
          this.administrator.vendor_id = 2;
          break;

        default:
          this.administrator.permission = 'superuser';
          break;
      }

      return true;
    }

    return false;
  }

  logout() {
    this.administrator = new User();
  }
}
