import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { removeFavorite } from '../../../store/favorites/favorites.actions';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [provideMockStore()],
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
    const mockFavorites = [{ name: 'Mock Book', authors: ['Author'] }] as any;
    spyOn(store, 'select').and.returnValue(of(mockFavorites));

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;

    component.favorites$.subscribe((favorites) => {
      expect(favorites).toEqual(mockFavorites);
      done();
    });
  });

  it('should dispatch removeFavorite when remove() is called', () => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;

    const mockBook = { name: 'Book A' };
    component.remove(mockBook);
    expect(dispatchSpy).toHaveBeenCalledWith(removeFavorite({ book: mockBook }));
  });
});
