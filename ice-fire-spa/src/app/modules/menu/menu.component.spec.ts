import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { Subject } from 'rxjs';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let sessionSpy: jasmine.SpyObj<SessionService>;
  let routerEvents$: Subject<void>;
  let currentUrl = '/';

  beforeEach(async () => {

    routerEvents$ = new Subject<void>();

    routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
      events: routerEvents$.asObservable(),
    });
    Object.defineProperty(routerSpy, 'url', {
      get: () => currentUrl,
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

  it('should set activeRoute on init', () => {
    expect(component.activeRoute).toBe('/');
  });

  it('should update activeRoute when navigate is called', () => {
    component.navigate('/favorites');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/favorites']);
    expect(component.activeRoute).toBe('/favorites');
  });

  it('should detect active route correctly', () => {
    component.activeRoute = '/favorites';
    expect(component.isActive('/favorites')).toBeTrue();
    expect(component.isActive('/')).toBeFalse();
  });

  it('should call sessionService.logout on logout()', () => {
    component.logout();
    expect(sessionSpy.logout).toHaveBeenCalled();
  });

  it('should update activeRoute on router event', () => {
    currentUrl = '/favorites';
    routerEvents$.next();
    expect(component.activeRoute).toBe('/favorites');
  });
});
