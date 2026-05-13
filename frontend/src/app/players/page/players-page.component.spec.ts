import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayersPageComponent} from './players-page.component';
import {NavigatorService} from "../../core/services/navigator.service";
import {PlayerCardComponent} from "../components/player-card/player-card.component";
import {AddPlayerFormComponent} from "../components/add-player-form/add-player-form.component";
import {BackgroundImageService} from "../../core/stores/background-image.service";
import {PlayersDataService} from '../services/players-data.service';
import {PlayersAddService} from '../services/players-add.service';

describe('PlayersPageComponent', () => {
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;

  const playersDataServiceMock = {
    init: vi.fn(),
    reset: vi.fn(),
    pagination: vi.fn(),
    isLoading: vi.fn(),
    isError: vi.fn(),
  };
  const playersAddServiceMock = {
    addPlayer: vi.fn(),
  };
  const navigatorMock = {
    goToProfilePage: vi.fn(),
  };
  const backgroundImageServiceMock = {
    useTopPlayedGame: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersPageComponent, PlayerCardComponent, AddPlayerFormComponent],
      providers: [
        {provide: PlayersDataService, useValue: playersDataServiceMock},
        {provide: PlayersAddService, useValue: playersAddServiceMock},
        {provide: BackgroundImageService, useValue: backgroundImageServiceMock},
        {provide: NavigatorService, useValue: navigatorMock},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  // it('should refresh game cover when players page loads', () => {
  //   component.ngOnInit();
  //   expect(mockGameCoverStore.useTopPlayedGame).toHaveBeenCalled();
  // });
  //
  // it('should reset search on init', () => {
  //   expect(mockPlayerListStore.resetSearch).toHaveBeenCalled();
  //   expect(mockPlayerListStore.search).toHaveBeenCalled();
  // });
});
