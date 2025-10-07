import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { Router, Event } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Subject } from 'rxjs';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let sessionSpy: jasmine.SpyObj<SessionService>;
  let routerEvents$: Subject<Event>;

  beforeEach(async () => {
    routerEvents$ = new Subject<Event>();

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate'], {
      events: routerEvents$.asObservable(),
      url: '/',
    });

    sessionSpy = jasmine.createSpyObj('SessionService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: SessionService, useValue: sessionSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update activeRoute when navigate is called', () => {
    component.navigate('/favorites');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/favorites']);
    expect(component.activeRoute).toBe('/favorites');
  });

  it('should update activeRoute on router event', () => {
    Object.defineProperty(routerSpy, 'url', { get: () => '/favorites' });
    routerEvents$.next({} as Event);
    expect(component.activeRoute).toBe('/favorites');
  });

});
