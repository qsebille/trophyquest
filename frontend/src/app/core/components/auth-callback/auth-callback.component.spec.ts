import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthCallbackComponent} from './auth-callback.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {MockedObject, vi} from 'vitest';
import {AuthService} from '../../services/auth.service';

describe('AuthCallbackComponent', () => {
  let component: AuthCallbackComponent;
  let fixture: ComponentFixture<AuthCallbackComponent>;

  let mockAuthService: MockedObject<AuthService>

  beforeEach(async () => {
    mockAuthService = {
      handleCallback: vi.fn(),
      refreshCurrentUser: vi.fn(),
    } as MockedObject<AuthService>;


    await TestBed.configureTestingModule({
      imports: [AuthCallbackComponent],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({code: 'test-code', state: 'test-state'}),
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
