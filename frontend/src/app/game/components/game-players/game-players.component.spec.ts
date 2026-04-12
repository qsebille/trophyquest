import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamePlayersComponent} from './game-players.component';
import {initPagination} from '../../../core/api/dtos/pagination';

describe('GamePlayersComponent', () => {
  let component: GamePlayersComponent;
  let fixture: ComponentFixture<GamePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePlayersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GamePlayersComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('playersPagination', initPagination(0));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
