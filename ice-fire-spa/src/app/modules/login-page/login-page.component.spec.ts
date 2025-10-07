import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { NotificationService } from '../../services/notification.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    sessionServiceSpy = jasmine.createSpyObj('SessionService', ['login', 'register']);
    notificationSpy = jasmine.createSpyObj('NotificationService', [
      'openSnackBarSuccess',
      'openSnackBarFailure'
    ]);

    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: SessionService, useValue: sessionServiceSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle between login and register modes', () => {
    expect(component.isRegisterMode).toBeFalse();
    component.toggleMode();
    expect(component.isRegisterMode).toBeTrue();
  });

  it('should call SessionService.login on valid login form', async () => {
    component.loginForm.setValue({ username: 'john', password: '1234' });
    sessionServiceSpy.login.and.resolveTo();
    await component.onSubmit();
    expect(sessionServiceSpy.login).toHaveBeenCalledWith('john', '1234');
  });

  it('should call SessionService.register when in register mode', async () => {
    component.isRegisterMode = true;
    component.loginForm.setValue({ username: 'newUser', password: 'abcd' });
    sessionServiceSpy.register.and.resolveTo();
    await component.onSubmit();
    expect(sessionServiceSpy.register).toHaveBeenCalledWith('newUser', 'abcd');
  });
});
