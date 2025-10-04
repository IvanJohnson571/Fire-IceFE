import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  hidePassword: boolean = true;
  errorMessage;
  loginForm: FormGroup;

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async logIn() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    await this.sessionService.login(this.loginForm.value.username!, this.loginForm.value.password!);
    this.loading = false;
  }

}
