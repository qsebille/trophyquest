import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePlayerCardComponent} from './home-player-card.component';
import {HomeActivePlayer} from '../../models/home-active-player';
import {HomeActivePlayerTrophy} from '../../models/home-active-player-trophy';

describe('HomePlayerCardComponent', () => {
  let component: HomePlayerCardComponent;
  let fixture: ComponentFixture<HomePlayerCardComponent>;

  const trophyMock = {
    id: 'trophy-1',
    trophySuiteId: 'suite-1',
    gameId: 'game-1',
    gameName: 'Game 1',
    title: 'Trophy 1',
    trophyType: 'bronze',
    iconUrl: 'trophy.png',
    earnedAt: new Date(),
  } as HomeActivePlayerTrophy;

  const playerMock = {
    id: 'player-123',
    pseudo: 'Pseudo',
    avatarUrl: 'avatar.png',
    nbRecentlyEarnedTrophies: 2,
    trophies: [trophyMock],
  } as HomeActivePlayer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePlayerCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePlayerCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('player', playerMock);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should emit event when clicking on player pseudo', () => {
    const spy = vi.spyOn(component.onClickOnPseudo, 'emit');
    const nativeElement = fixture.nativeElement as HTMLElement;
    const pseudoLink = nativeElement.querySelector('[data-testid="player-pseudo"]');
    expect(pseudoLink).toBeTruthy();
    pseudoLink?.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });
});
