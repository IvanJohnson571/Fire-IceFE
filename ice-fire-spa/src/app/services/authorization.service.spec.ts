import { TestBed } from '@angular/core/testing';
import { AuthorizationService } from './authorization.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorizationService],
    });

    service = TestBed.inject(AuthorizationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request to login endpoint', async () => {
    const mockResponse = { success: true };
    const username = 'test';
    const password = '1234';

    const promise = service.login(username, password);

    const req = httpMock.expectOne(`${environment.baseUrl}api/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBeTrue();
    expect(req.request.body).toEqual({ username, password });

    req.flush(mockResponse);

    const result = await promise;
    expect(result).toEqual(mockResponse);
  });

  it('should throw if server returns error', async () => {
    const username = 'invalid';
    const password = 'wrong';

    const promise = service.login(username, password);
    const req = httpMock.expectOne(`${environment.baseUrl}api/auth/login`);
    req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    await expectAsync(promise).toBeRejected();
  });
});
