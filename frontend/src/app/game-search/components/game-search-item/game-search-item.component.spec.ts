import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameSearchItemComponent} from './game-search-item.component';
import {Component} from '@angular/core';
import {provideRouter, Router} from '@angular/router';

@Component({selector: 'tq-dummy', template: ''})
class DummyComponent {
}

describe('GameSearchItemComponent', () => {
  let component: GameSearchItemComponent;
  let fixture: ComponentFixture<GameSearchItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSearchItemComponent],
      providers: [
        provideRouter([{path: 'game/:id', component: DummyComponent}])
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(GameSearchItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('game', {id: '123'} as unknown as GameSearchItemComponent);
    fixture.detectChanges();
  });

  it('should route to game page when clicking on game title', async () => {
    const link = fixture.nativeElement.querySelector('[data-testid="game-title-123"]');
    expect(link).not.toBeNull();
    link!.click();
    await fixture.whenStable();
    expect(router.url).toBe('/game/123');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
