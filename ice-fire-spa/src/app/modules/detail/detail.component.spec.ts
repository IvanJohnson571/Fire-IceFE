import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [DetailComponent],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: { params: of({ id: 1 }) }
      }
    ]
  }).compileComponents();
});
