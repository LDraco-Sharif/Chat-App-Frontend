import { GroupService } from './../../services/group.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  groupName: string | null = null;
  isLoggedIn: boolean = false;
  subs: Subscription[] = [];
  constructor(public authService: AuthService, private groupService: GroupService) {

  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
  ngOnInit(): void {
    const sub = this.groupService.$groupName().subscribe((response) => {
      this.groupName = response;
    });
    this.subs.push(sub);
  }

  onLogOutClicked() {
    this.authService.logOut();
    this.groupName = "";
  }
}
