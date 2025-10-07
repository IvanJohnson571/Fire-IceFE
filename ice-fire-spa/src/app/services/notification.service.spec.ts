import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    service = TestBed.inject(NotificationService);
  });

  it('should show success snackbar with correct config', () => {
    service.openSnackBarSuccess('Success!');
    const config = snackBarSpy.open.calls.mostRecent().args[2];
    expect(config.panelClass).toEqual(['snackbar-success']);
  });

  it('should show failure snackbar with correct config', () => {
    service.openSnackBarFailure('Error!');
    const config = snackBarSpy.open.calls.mostRecent().args[2];
    expect(config.panelClass).toEqual(['snackbar-failure']);
  });

  it('should show warning snackbar with correct config', () => {
    service.openSnackBarWarning('Warning!');
    const config = snackBarSpy.open.calls.mostRecent().args[2];
    expect(config.panelClass).toEqual(['snackbar-warning']);
  });
});
