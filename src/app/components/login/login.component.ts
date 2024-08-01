import { GroupService } from './../../services/group.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isPasswordVisible: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private groupService: GroupService, private toastrService: ToastrService) {
    this.loginForm = fb.group({
      name: ['', [Validators.minLength(1), Validators.required,]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      groupName: ['', [Validators.required, Validators.minLength(1)]],
    })
  }

  goToChat() {
    //this.auth.logIn();
  }

  createGroup() {
    this.groupService.createGroup(this.name?.value, this.password?.value, this.groupName?.value).subscribe({
      next: (response: any) => {
        this.onSuccessfulAuth(response);
      },
      error: (errorObj) => {
        console.log(errorObj.error.message);
        this.toastrService.error(errorObj.error.message);
      }
    })
  }

  enterGroup() {
    this.groupService.enterGroup(this.name?.value, this.password?.value, this.groupName?.value).subscribe({
      next: (response: any) => {
        this.onSuccessfulAuth(response);
      },
      error: (errorObj) => {
        console.log(errorObj.error.message);
        this.toastrService.error(errorObj.error.message);
      }
    })
  }

  onSuccessfulAuth(response: any) {
    this.auth.logIn(response.userId);
    this.router.navigate(['chat', { groupName: response.groupName, groupId: response.groupId, userName: response.userName }]);
  }

  get name() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get groupName() {
    return this.loginForm.get('groupName');
  }
}
