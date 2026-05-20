import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameTrophyListComponent} from './game-trophy-list.component';
import {Trophy} from '../../../../core/api/dtos/trophy/trophy';

describe('GameTrophyListComponent', () => {
  let component: GameTrophyListComponent;
  let fixture: ComponentFixture<GameTrophyListComponent>;

  const trophyMock = (id: string, groupType: string, rank: number): Trophy => ({
    id,
    rank,
    title: id,
    description: '',
    trophyType: 'bronze',
    isHidden: false,
    iconUrl: 'trophy.png',
    groupType,
    groupName: `${groupType} group`,
    trophySuiteId: 'suite-1',
    earnedAt: null as unknown as Date,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTrophyListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameTrophyListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trophies', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort trophies by ascending rank in each group', () => {
    fixture.componentRef.setInput('trophies', [
      trophyMock('group-a-rank-3', 'group-a', 3),
      trophyMock('group-b-rank-2', 'group-b', 2),
      trophyMock('group-a-rank-1', 'group-a', 1),
      trophyMock('group-b-rank-1', 'group-b', 1),
      trophyMock('group-a-rank-2', 'group-a', 2),
    ]);
    fixture.detectChanges();

    expect(component.trophyGroups().map(group => ({
      trophyGroupId: group.trophyGroupId,
      trophyIds: group.trophies.map(trophy => trophy.id),
    }))).toEqual([
      {
        trophyGroupId: 'group-a',
        trophyIds: ['group-a-rank-1', 'group-a-rank-2', 'group-a-rank-3'],
      },
      {
        trophyGroupId: 'group-b',
        trophyIds: ['group-b-rank-1', 'group-b-rank-2'],
      },
    ]);
  });
});
