import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { SharedModule } from '../shared/shared.module';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  hidePassword: boolean = true;
  errorMessage = '';
  loginForm: FormGroup;
  isRegisterMode = false;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    public notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    try {

      if (this.isRegisterMode) {
        await this.sessionService.register(username, password);
        this.isRegisterMode = false;

      } else {
        await this.sessionService.login(username, password);

      }

    } catch (err: any) {
      this.notificationService.openSnackBarFailure('Something went wrong');

    }

  }

}
