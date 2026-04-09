import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameDetailsComponent} from './game-details.component';
import {GameDetails} from '../../../core/api/dtos/game/game-details';

describe('GameDetailsComponent', () => {
  let component: GameDetailsComponent;
  let fixture: ComponentFixture<GameDetailsComponent>;

  let mockGameDetails = {
    id: 'game-123',
    images: [
      {id: 'image-1', imageUrl: 'https://example.com/image-1.jpg', imageType: 'screenshot'},
      {id: 'image-2', imageUrl: 'https://example.com/image-2.jpg', imageType: 'something'},
    ]
  } as unknown as GameDetails;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('gameDetails', mockGameDetails);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
