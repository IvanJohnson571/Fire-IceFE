import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { Session, User } from '../models/common';

describe('SessionService', () => {
  let service: SessionService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    notificationSpy = jasmine.createSpyObj('NotificationService', [
      'openSnackBarSuccess',
      'openSnackBarFailure'
    ]);

    TestBed.configureTestingModule({
      providers: [
        SessionService,
        { provide: HttpClient, useValue: httpSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NotificationService, useValue: notificationSpy }
      ]
    });

    service = TestBed.inject(SessionService);
  });

  it('should set currentUser and navigate to root on successful login', async () => {
    httpSpy.post.and.returnValue(of({}));
    httpSpy.get.and.returnValue(
      of({
        isAuthenticated: true,
        user: { id: 1, username: 'Ivan', iat: 0, exp: 0 }
      } as Session)
    );

    await service.login('user', 'pass');

    expect(service.currentUser).toEqual(
      jasmine.objectContaining({ username: 'Ivan' })
    );
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
    expect(notificationSpy.openSnackBarSuccess).toHaveBeenCalledWith('Login successful');
  });

  it('should navigate to /login if session is not authenticated', async () => {
    httpSpy.post.and.returnValue(of({}));
    httpSpy.get.and.returnValue(of({ isAuthenticated: false } as Session));

    await service.login('user', 'pass');

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should call openSnackBarFailure on login error', async () => {
    httpSpy.post.and.returnValue(throwError(() => new Error('Network error')));

    await service.login('user', 'pass');

    expect(notificationSpy.openSnackBarFailure).toHaveBeenCalledWith('Login failed');
  });

  it('should return session and set currentUser on success', async () => {
    const mockSession: Session = {
      isAuthenticated: true,
      user: { id: 1, username: 'Ivan', iat: 0, exp: 0 }
    };
    httpSpy.get.and.returnValue(of(mockSession));

    const result = await service.checkSession();

    expect(result).toEqual(mockSession);
    expect(service.currentUser).toEqual(
      jasmine.objectContaining({ username: 'Ivan' })
    );
  });

  it('should return {isAuthenticated: false} and clear currentUser on error', async () => {
    httpSpy.get.and.returnValue(throwError(() => new Error('error')));

    const result = await service.checkSession();

    expect(result).toEqual({ isAuthenticated: false });
    expect(service.currentUser).toBeNull();
  });

  it('should remove token and navigate to /login on logout', async () => {
    spyOn(localStorage, 'removeItem');
    httpSpy.post.and.returnValue(of({}));

    await service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should show success notification on successful registration', async () => {
    httpSpy.post.and.returnValue(of({}));

    await service.register('user', 'pass');

    expect(notificationSpy.openSnackBarSuccess).toHaveBeenCalledWith(
      'Registration successful! You can now log in'
    );
  });

  it('should show failure notification on registration error', async () => {
    httpSpy.post.and.returnValue(throwError(() => new Error('error')));

    await expectAsync(service.register('user', 'pass')).toBeRejected();

    expect(notificationSpy.openSnackBarFailure).toHaveBeenCalledWith('Something went wrong');
  });
});
