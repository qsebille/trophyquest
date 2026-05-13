import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameTrophyCardComponent} from './game-trophy-card.component';
import {Trophy} from '../../../../core/api/dtos/trophy/trophy';

describe('GameTrophyCardComponent', () => {
  let component: GameTrophyCardComponent;
  let fixture: ComponentFixture<GameTrophyCardComponent>;

  const trophyMock = {
    id: 'trophy-1',
    title: 'Trophy 1',
    iconUrl: 'trophy-1.png',
  } as unknown as Trophy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTrophyCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameTrophyCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trophy', trophyMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isTrophyHidden', () => {
    it('should return false if trophy has hidden property false', () => {
      fixture.componentRef.setInput('trophy', {
        ...trophyMock,
        isHidden: false,
      });
      fixture.detectChanges();
      expect(component.isTrophyHidden()).toBeFalsy();
    });

    it('should return false if show filter is activated', () => {
      fixture.componentRef.setInput('showHiddenTrophies', true);
      fixture.detectChanges();
      expect(component.isTrophyHidden()).toBeFalsy();
    });

    it('should return true otherwise', () => {
      fixture.componentRef.setInput('trophy', {
        ...trophyMock,
        isHidden: true,
      });
      fixture.componentRef.setInput('showHiddenTrophies', false);
      fixture.detectChanges();
      expect(component.isTrophyHidden()).toBeTruthy();
    })
  });

  describe('isTrophyEarned', () => {
    it('should return false if trophy has no earned date', () => {
      fixture.componentRef.setInput('trophy', {
        ...trophyMock,
        earnedAt: null,
      });
      fixture.detectChanges();
      expect(component.isTrophyEarned()).toBeFalsy();
    });
    
    it('should return true otherwise', () => {
      fixture.componentRef.setInput('trophy', {
        ...trophyMock,
        earnedAt: new Date(),
      });
      fixture.detectChanges();
      expect(component.isTrophyEarned()).toBeTruthy();
    })
  });
});
