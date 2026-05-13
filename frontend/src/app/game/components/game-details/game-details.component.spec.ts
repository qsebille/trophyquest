import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameDetailsComponent} from './game-details.component';
import {GameDetails} from '../../../core/api/dtos/game/game-details';

describe('GameDetailsComponent', () => {
  let component: GameDetailsComponent;
  let fixture: ComponentFixture<GameDetailsComponent>;

  let gameDetailsMock = {
    id: 'game-123',
    name: 'Game 123',
    coverUrl: 'game-123.png',
  } as GameDetails;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('gameDetails', gameDetailsMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hasScreenshots', () => {
    it('should return true if screenshots are present', () => {
      fixture.componentRef.setInput('gameDetails', {
        ...gameDetailsMock,
        screenshotsUrl: ['screenshot-1.jpg', 'screenshot-2.jpg']
      });
      fixture.detectChanges();
      expect(component.hasScreenshots()).toBeTruthy();
    });

    it('should return false if screenshots are not present', () => {
      fixture.componentRef.setInput('gameDetails', {
        ...gameDetailsMock,
        screenshotsUrl: []
      });
      fixture.detectChanges();
      expect(component.hasScreenshots()).toBeFalsy();
    });
  });

  describe('hasIgdbInfo', () => {
    it('should return true if description info is present', () => {
      fixture.componentRef.setInput('gameDetails', {
        ...gameDetailsMock,
        description: 'Description'
      });
      fixture.detectChanges();
      expect(component.hasIgdbInfo()).toBeTruthy();
    });

    it('should return true if genres are present', () => {
      fixture.componentRef.setInput('gameDetails', {
        ...gameDetailsMock,
        genres: ['Action', 'Adventure']
      });
      fixture.detectChanges();
      expect(component.hasIgdbInfo()).toBeTruthy();
    });

    it('should return true if themes are present', () => {
      fixture.componentRef.setInput('gameDetails', {
        ...gameDetailsMock,
        themes: ['SF']
      });
      fixture.detectChanges();
      expect(component.hasIgdbInfo()).toBeTruthy();
    });

    it('should return false otherwise', () => {
      fixture.componentRef.setInput('gameDetails', {
        ...gameDetailsMock,
        description: null,
        genres: [],
        themes: [],
      });
      fixture.detectChanges();
      expect(component.hasIgdbInfo()).toBeFalsy();
    })
  })
});
