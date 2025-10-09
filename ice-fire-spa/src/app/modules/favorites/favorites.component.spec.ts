import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { removeFavorite } from '../../../store/favorites/favorites.actions';
import { of } from 'rxjs';
import { Book } from '../../models/common';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    notificationSpy = jasmine.createSpyObj('NotificationService', [
      'openSnackBarSuccess',
      'openSnackBarFailure'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        provideMockStore(),
        { provide: NotificationService, useValue: notificationSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should create', () => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should select favorites from store', (done) => {
    const mockFavorites: Partial<Book>[] = [
      { name: 'Mock Book', authors: ['Author'], url: 'mock-url' }
    ];
    spyOn(store, 'select').and.returnValue(of(mockFavorites as Book[]));

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;

    component.favorites$.subscribe((favorites) => {
      expect(favorites).toEqual(mockFavorites as Book[]);
      done();
    });
  });

  it('should dispatch removeFavorite when remove() is called', () => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;

    const mockBook: Partial<Book> = { name: 'Book A', url: 'mock-url' };
    component.remove(mockBook as Book);

    expect(dispatchSpy).toHaveBeenCalledWith(
      removeFavorite({ book: mockBook as Book })
    );
    expect(notificationSpy.openSnackBarSuccess).toHaveBeenCalledWith(
      'Removed from favorites successfully'
    );
  });

  it('should navigate to detail page when openDetail is called', () => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;

    const mockBook: Partial<Book> = { url: 'https://api/books/42' };
    component.openDetail(mockBook as Book);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/detail', '42']);
  });
});
