import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamePageComponent} from './game-page.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({gameId: 'game-123'}),
              queryParamMap: convertToParamMap({}),
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
