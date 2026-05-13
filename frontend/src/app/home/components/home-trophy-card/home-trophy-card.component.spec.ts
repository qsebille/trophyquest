import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeTrophyCardComponent} from './home-trophy-card.component';
import {Trophy} from "../../../core/api/dtos/trophy/trophy";

describe('HomeTrophyCardComponent', () => {
  let component: HomeTrophyCardComponent;
  let fixture: ComponentFixture<HomeTrophyCardComponent>;

  const mockEarnedTrophy = {id: '001', rank: 0, title: 'Trophy 1', iconUrl: 'trophy.png'} as Trophy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTrophyCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTrophyCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('trophy', mockEarnedTrophy);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
