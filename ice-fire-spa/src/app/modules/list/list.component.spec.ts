import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ListService } from './services/list.service';
import { NotificationService } from '../../services/notification.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let listServiceSpy: jasmine.SpyObj<ListService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {

    listServiceSpy = jasmine.createSpyObj('ListService', ['getBooks']);
    notificationSpy = jasmine.createSpyObj('NotificationService', [
      'openSnackBarFailure',
      'openSnackBarSuccess'
    ]);

    await TestBed.configureTestingModule({
      imports: [ListComponent, HttpClientTestingModule],
      providers: [
        { provide: ListService, useValue: listServiceSpy },
        { provide: NotificationService, useValue: notificationSpy },
        provideMockStore({ initialState: { favorites: [] } }),
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    listServiceSpy.getBooks.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should handle failed book load gracefully', () => {
    listServiceSpy.getBooks.and.returnValue(throwError(() => new Error('Network')));
    fixture.detectChanges();
    expect(notificationSpy.openSnackBarFailure).toHaveBeenCalledWith('Failed to load books');
  });
});
