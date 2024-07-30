import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  if (auth.isLoggedIn) {
    return true;
  }
  else {
    auth.logOut();
    return false;
  }
};
