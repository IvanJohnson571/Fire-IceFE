import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ListService } from '../list/services/list.service';
import { NotificationService } from '../../services/notification.service';
import { Book } from '../../models/common';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let listServiceSpy: jasmine.SpyObj<ListService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    listServiceSpy = jasmine.createSpyObj('ListService', ['getBookById']);
    notificationSpy = jasmine.createSpyObj('NotificationService', ['openSnackBarFailure']);

    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['id', '1']]) } } },
        { provide: ListService, useValue: listServiceSpy },
        { provide: NotificationService, useValue: notificationSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load book when id is present', () => {
    const mockBook: Partial<Book> = {
      name: 'Mock Book',
      authors: ['Author'],
      isbn: '1234567890',
      numberOfPages: 500,
      publisher: 'Mock Publisher',
      country: 'Westeros',
      mediaType: 'Hardcover',
      released: '2024-01-01T00:00:00',
      url: 'https://api/books/1',
      characters: [],
      povCharacters: []
    };

    listServiceSpy.getBookById.and.returnValue(of(mockBook as Book));

    fixture.detectChanges();

    expect(listServiceSpy.getBookById).toHaveBeenCalledWith('1');
    expect(component.book).toEqual(jasmine.objectContaining({ name: 'Mock Book' }));
  });

  it('should handle error when book load fails', () => {
    listServiceSpy.getBookById.and.returnValue(throwError(() => new Error('Network error')));

    fixture.detectChanges();

    expect(notificationSpy.openSnackBarFailure).toHaveBeenCalledWith('Error loading book');
  });
});
