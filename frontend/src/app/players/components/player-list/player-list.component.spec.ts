import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayerListComponent} from './player-list.component';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;

  const playerMock = {
    id: 'player-123',
    pseudo: 'Player 123',
    avatar: 'avatar.png',
    nbPlayedGames: 100,
    nbEarnedPlatinum: 1,
    nbEarnedGold: 2,
    nbEarnedSilver: 3,
    nbEarnedBronze: 4,
  }
  const paginatedPlayersMock = {
    content: [playerMock],
    total: 2,
    size: 1,
    page: 0,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('paginatedPlayers', paginatedPlayersMock);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  describe('Pagination', () => {
    it('should initialize data', () => {
      expect(component.players()).toEqual([playerMock]);
      expect(component.collectionSize()).toBe(2);
      expect(component.pageSize()).toBe(1);
      expect(component.page()).toBe(1);
      expect(component.isEmpty()).toBeFalsy();
      expect(component.hasOnePage()).toBeFalsy();
    });
  });

  describe('isEmpty', () => {
    it('should return true if there are no players', () => {
      fixture.componentRef.setInput('paginatedPlayers', {
        content: [],
        total: 0,
        size: 1,
        page: 0,
      });
      fixture.detectChanges();
      expect(component.isEmpty()).toBeTruthy();
    });
    it('should return false if there are players', () => {
      fixture.componentRef.setInput('paginatedPlayers', {
        content: [playerMock],
        total: 1,
        size: 1,
        page: 0,
      });
      fixture.detectChanges();
      expect(component.isEmpty()).toBeFalsy();
    });
  });

  describe('hasOnePage', () => {
    it('should return true if there is only one page', () => {
      fixture.componentRef.setInput('paginatedPlayers', {
        content: [playerMock],
        total: 1,
        size: 1,
      });
      fixture.detectChanges();
      expect(component.hasOnePage()).toBeTruthy();
    });
    it('should return false if there are multiple pages', () => {
      fixture.componentRef.setInput('paginatedPlayers', {
        content: [playerMock],
        total: 2,
        size: 1,
      });
      fixture.detectChanges();
      expect(component.hasOnePage()).toBeFalsy();
    });
  });

  describe('changePage', () => {
    it('should emit the change page event', () => {
      fixture.componentRef.setInput('paginatedPlayers', {
        page: 0,
      });
      fixture.detectChanges();
      expect(component.page()).toEqual(1);
      const emitSpy = vi.spyOn(component.onPageChange, 'emit');
      component.changePage(2);
      expect(emitSpy).toHaveBeenCalledWith(1);
    });

    it('should not emit the change page event if the page is the same', () => {
      fixture.componentRef.setInput('paginatedPlayers', {
        page: 0,
      });
      fixture.detectChanges();
      expect(component.page()).toEqual(1);
      const emitSpy = vi.spyOn(component.onPageChange, 'emit');
      component.changePage(1);
      expect(emitSpy).not.toHaveBeenCalled();
    })
  });
});
