import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  constructor(private router: Router, private cookieService: CookieService) {
    this.isLoggedIn = this.getLoginFromCookies() ? true : false;
  }

  logIn() {
    this.isLoggedIn = true;
    this.setLoginFromCookies(this.isLoggedIn);
    this.router.navigate(['chat']);
  }

  logOut() {
    this.isLoggedIn = false;
    this.removeLoginFromCookies();
    this.router.navigate(['']);
  }

  getLoginFromCookies() {
    return this.cookieService.get("is-logged-in");
  }

  setLoginFromCookies(value: boolean) {
    this.cookieService.set("is-logged-in", String(value));
  }

  removeLoginFromCookies() {
    this.cookieService.delete("is-logged-in");
  }
}
