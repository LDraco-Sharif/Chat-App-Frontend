import { GroupService } from './group.service';
import { inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

const loginUserKey = 'user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private cookieService: CookieService) {
    this.isLoggedIn = this.getUserFromCookies() ? true : false;
  }

  logIn(userId: string) {
    this.isLoggedIn = true;
    this.setUserToCookies(userId);
  }

  logOut() {
    this.isLoggedIn = false;
    this.removeUserFromCookies();
    this.router.navigate(['']);
  }

  getUserFromCookies() {
    return this.cookieService.get(loginUserKey);
  }

  setUserToCookies(value: string) {
    this.cookieService.set(loginUserKey, value);
  }

  removeUserFromCookies() {
    this.cookieService.delete(loginUserKey);
  }
}
