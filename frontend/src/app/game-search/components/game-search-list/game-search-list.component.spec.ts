import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameSearchListComponent} from './game-search-list.component';

describe('GameSearchListComponent', () => {
  let component: GameSearchListComponent;
  let nativeElement: HTMLElement;
  let fixture: ComponentFixture<GameSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSearchListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameSearchListComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('games', []);
    fixture.componentRef.setInput('hasMoreGames', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component setup', () => {
  });

  describe('Load more games button', () => {
    it('should be hidden if no more games to load', () => {
      fixture.componentRef.setInput('hasMoreGames', false);
      fixture.detectChanges();
      const loadMoreButton = nativeElement.querySelector('[data-testid="load-more-button"]');
      expect(loadMoreButton).toBeNull();
    });

    it('should be visible if more games to load', () => {
      fixture.componentRef.setInput('hasMoreGames', true);
      fixture.detectChanges();
      const loadMoreButton = nativeElement.querySelector('[data-testid="load-more-button"]');
      expect(loadMoreButton).not.toBeNull();
    })
  });
});
