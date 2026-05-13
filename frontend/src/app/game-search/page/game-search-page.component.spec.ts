import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameSearchPageComponent} from './game-search-page.component';

describe('GameSearchPageComponent', () => {
  let component: GameSearchPageComponent;
  let fixture: ComponentFixture<GameSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSearchPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
