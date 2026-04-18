import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeStatsComponent} from './home-stats.component';
import {HomeStatsData} from '../../models/home-stats-data';

describe('HomeStatsComponent', () => {
  let component: HomeStatsComponent;
  let fixture: ComponentFixture<HomeStatsComponent>;

  const stats: HomeStatsData = {
    total: {player: 0, game: 1, trophy: 2},
    lastWeek: {player: 3, game: 4, trophy: 5},
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeStatsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeStatsComponent);
    fixture.componentRef.setInput('stats', stats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
