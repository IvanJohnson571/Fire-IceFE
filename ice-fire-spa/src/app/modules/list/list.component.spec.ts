import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ListService } from './services/list.service';
import { NotificationService } from '../../services/notification.service';
import { addFavorite, removeFavorite } from '../../../store/favorites/favorites.actions';
import { Book } from '../../models/common';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let listServiceSpy: jasmine.SpyObj<ListService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let store: MockStore;

  beforeEach(async () => {
    listServiceSpy = jasmine.createSpyObj('ListService', ['getBooks']);
    notificationSpy = jasmine.createSpyObj('NotificationService', [
      'openSnackBarFailure',
      'openSnackBarSuccess'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ListComponent, HttpClientTestingModule],
      providers: [
        { provide: ListService, useValue: listServiceSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: Router, useValue: routerSpy },
        provideMockStore({ initialState: { favorites: [] } })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
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
    expect(component.dataReady).toBeTrue();
  });

  it('should filter books based on search term', () => {
    const mockBooks: Partial<Book>[] = [
      { name: 'Fire & Ice', authors: ['George R. R. Martin'] },
      { name: 'The Hobbit', authors: ['Tolkien'] }
    ];
    listServiceSpy.getBooks.and.returnValue(of(mockBooks as Book[]));
    fixture.detectChanges();

    component.searchTerm = 'hobbit';
    component.onSearchChange();

    expect(component.filteredBooks.length).toBe(1);
    expect(component.filteredBooks[0].name).toBe('The Hobbit');
  });

  it('should clear search and restore full list', () => {
    const mockBooks: Partial<Book>[] = [{ name: 'Book A', authors: ['X'] }];
    listServiceSpy.getBooks.and.returnValue(of(mockBooks as Book[]));
    fixture.detectChanges();

    component.searchTerm = 'book';
    component.filteredBooks = [];
    component.clearSearch();

    expect(component.searchTerm).toBe('');
    expect(component.filteredBooks).toEqual(mockBooks as Book[]);
  });

  it('should navigate to book detail page', () => {
    listServiceSpy.getBooks.and.returnValue(of([]));
    fixture.detectChanges();

    const book: Partial<Book> = { url: 'https://api/books/42' };
    component.openDetail(book as Book);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/detail', '42']);
  });

  it('should dispatch addFavorite when not favorite', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const mockBook: Partial<Book> = { url: '123' };
    component.favorites = [];
    const fakeEvent = new MouseEvent('click');
    component.toggleFavorite(mockBook as Book, fakeEvent);

    expect(dispatchSpy).toHaveBeenCalledWith(addFavorite({ book: mockBook as Book }));
  });

  it('should dispatch removeFavorite when already favorite', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const mockBook: Partial<Book> = { url: '123' };
    component.favorites = [{ url: '123' } as Book];
    const fakeEvent = new MouseEvent('click');
    component.toggleFavorite(mockBook as Book, fakeEvent);

    expect(dispatchSpy).toHaveBeenCalledWith(removeFavorite({ book: mockBook as Book }));
  });

  it('should correctly detect favorite status', () => {
    const mockBook: Partial<Book> = { url: '123' };
    component.favorites = [{ url: '123' } as Book];
    expect(component.isFavorite(mockBook as Book)).toBeTrue();
  });
});
