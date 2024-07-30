import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = fb.group({
      name: ['', [Validators.minLength(8), Validators.required,]],
      groupName: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  goToChat() {
    this.auth.logIn();
  }

  get name() {
    return this.loginForm.get('name');
  }

  get groupName() {
    return this.loginForm.get('groupName');
  }
}
