import { TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    const fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
