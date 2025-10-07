import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { CommonService } from './services/common.service';
import { LoaderService } from './components/loader/loader.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let commonServiceSpy: jasmine.SpyObj<CommonService>;

  beforeEach(async () => {
    commonServiceSpy = jasmine.createSpyObj('CommonService', ['adjustSnackBarStyle']);

    const mockLoaderService = {
      isLoading: new BehaviorSubject(false)
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: CommonService, useValue: commonServiceSpy },
        { provide: LoaderService, useValue: mockLoaderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should call adjustSnackBarStyle after view init', () => {
    component.ngAfterViewInit();
    expect(commonServiceSpy.adjustSnackBarStyle).toHaveBeenCalledTimes(1);
  });
});
