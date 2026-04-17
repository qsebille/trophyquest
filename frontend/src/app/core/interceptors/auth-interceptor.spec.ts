import {TestBed} from '@angular/core/testing';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {authInterceptor} from './auth-interceptor';
import {AuthService} from '../services/auth.service';
import {environment} from '../../../environments/environment';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: any;

  const mockAuthState = {
    accessToken: 'mock-token',
    idToken: 'mock-id-token',
    expiresAt: Date.now() + 10000
  };

  beforeEach(() => {
    const authServiceMock = {
      authState: vi.fn().mockReturnValue(mockAuthState),
      isAuthenticated: vi.fn().mockReturnValue(true)
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        {provide: AuthService, useValue: authServiceMock}
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add an Authorization header when authenticated and calling API', () => {
    httpClient.get(`${environment.apiUrl}/test`).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
  });

  it('should NOT add an Authorization header when NOT authenticated (no token)', () => {
    authService.authState.mockReturnValue(null);
    authService.isAuthenticated.mockReturnValue(false);

    httpClient.get(`${environment.apiUrl}/test`).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.headers.has('Authorization')).toBe(false);
  });

  it('should NOT add an Authorization header when token is expired', () => {
    const expiredState = {
      ...mockAuthState,
      expiresAt: Date.now() - 10000
    };
    authService.authState.mockReturnValue(expiredState);
    authService.isAuthenticated.mockReturnValue(false);

    httpClient.get(`${environment.apiUrl}/test`).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.headers.has('Authorization')).toBe(false);
  });

  it('should NOT add an Authorization header when not calling API', () => {
    httpClient.get('https://other-api.com/test').subscribe();

    const req = httpTestingController.expectOne('https://other-api.com/test');
    expect(req.request.headers.has('Authorization')).toBe(false);
  });
});
