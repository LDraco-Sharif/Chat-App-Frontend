import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { loginGuard } from './guards/login.guard';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: 'chat',
    title: 'Chat',
    component: ChatBoxComponent,
    canActivate: [loginGuard]
  },
  {
    path: '**',
    title: 'PAGE NOT FOUND',
    component: ErrorPageComponent,
  }
];
