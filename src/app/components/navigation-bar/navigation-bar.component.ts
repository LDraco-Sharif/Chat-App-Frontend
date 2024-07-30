import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

  isLoggedIn: boolean = false;
  constructor(public authService: AuthService) {

  }

  onLogOutClicked() {
    this.authService.logOut();
  }
}
