import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ModalsService } from '../../services/modals.service';
import { User } from '../../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Object = {
    username: '',
    password: ''
  }

  controller: Object = {
    login: false
  }

  administrator: User;

  constructor(
    private modalsService: ModalsService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.administrator = this.userService.administrator;
  }

  login(event) {
    event.preventDefault();

    const login = this.userService.login(this.user);

    if (!login) {
      return alert('Please doublecheck your credentials');
    }

    return this.controller['login'] = true;
  }


  logout(event) {
    event.preventDefault();

    this.userService.logout();

    return this.controller['login'] = false;
  }

  close(event) {
    event.preventDefault();

    this.modalsService.toggleModal('login');

    return;
  }
}
