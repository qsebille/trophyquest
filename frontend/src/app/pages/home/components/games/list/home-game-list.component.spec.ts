import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeGameListComponent} from './home-game-list.component';

describe('HomeGameListComponent', () => {
  let component: HomeGameListComponent;
  let fixture: ComponentFixture<HomeGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGameListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
