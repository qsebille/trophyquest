import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {provideRouter, Router} from '@angular/router';
import {beforeEach, describe, expect, it} from 'vitest';

import {NavbarComponent} from './navbar.component';

@Component({
  selector: 'tq-dummy-component',
  template: '',
})
class DummyComponent {
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([
          {path: 'players', component: DummyComponent},
          {path: 'igdb-mapping', component: DummyComponent},
          {path: 'game-search', component: DummyComponent},
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the application title', () => {
    const title = fixture.nativeElement.querySelector('.navbar-title');
    expect(title?.textContent?.trim()).toBe('TrophyQuest');
  });

  it('should link to the players page when clicking on link', async () => {
    const playersLink = fixture.debugElement.query(By.css('#navbar-players-link'));
    playersLink.nativeElement.click();
    await fixture.whenStable();
    expect(router.url).toBe('/players');
  });

  it('should link to the game search page when clicking on link', async () => {
    const gameSearchLink = fixture.debugElement.query(By.css('#navbar-game-search-link'));
    gameSearchLink.nativeElement.click();
    await fixture.whenStable();
    expect(router.url).toBe('/game-search');
  });
});
