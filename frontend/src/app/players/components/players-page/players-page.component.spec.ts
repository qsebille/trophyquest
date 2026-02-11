import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayersPageComponent} from './players-page.component';
import {PlayerListStore} from '../../stores/player-list-store';
import {NavigatorService} from "../../../core/services/navigator.service";
import {PlayerCardComponent} from "../player-card/player-card.component";
import {AddPlayerFormComponent} from "../add-player-form/add-player-form.component";
import {GameCoverStoreService} from "../../../core/stores/game-cover-store.service";

describe('PlayersPageComponent', () => {
    let component: PlayersPageComponent;
    let fixture: ComponentFixture<PlayersPageComponent>;

    let navigatorSpy: jasmine.SpyObj<NavigatorService>;
    let playerListStoreSpy: jasmine.SpyObj<PlayerListStore>;
    let gameCoverStoreSpy: jasmine.SpyObj<GameCoverStoreService>;

    const gameId: string = 'game-123';
    const playerId: string = 'player-123';

    beforeEach(async () => {
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToProfilePage', 'goToPlayerTrophySuitePage']);
        playerListStoreSpy = jasmine.createSpyObj('PlayerListStore', ['resetSearch', 'search', 'loadMore', 'addPlayer', 'resetAddPlayerStatus', 'results', 'total', 'status', 'addStatus']);
        gameCoverStoreSpy = jasmine.createSpyObj('GameCoverStoreService', ['refreshTopPlayedGame']);

        playerListStoreSpy.results.and.returnValue([]);

        await TestBed.configureTestingModule({
            imports: [PlayersPageComponent, PlayerCardComponent, AddPlayerFormComponent],
            providers: [
                {provide: NavigatorService, useValue: navigatorSpy},
                {provide: PlayerListStore, useValue: playerListStoreSpy},
                {provide: GameCoverStoreService, useValue: gameCoverStoreSpy},
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayersPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

    it('should refresh game cover when players page loads', () => {
        gameCoverStoreSpy.refreshTopPlayedGame.and.callThrough();
        component.ngOnInit();
        expect(gameCoverStoreSpy.refreshTopPlayedGame).toHaveBeenCalled();
    });

    it('should reset search on init', () => {
        expect(playerListStoreSpy.resetSearch).toHaveBeenCalled();
        expect(playerListStoreSpy.search).toHaveBeenCalled();
    });

    it('should navigate to profile page', () => {
        component.navigateToProfilePage(playerId);

        expect(navigatorSpy.goToProfilePage).toHaveBeenCalledOnceWith(playerId);
    });

    it('should navigate to player last game page', () => {
        component.navigateToPlayerTrophySuitePage(gameId, playerId);

        expect(navigatorSpy.goToPlayerTrophySuitePage).toHaveBeenCalledWith(gameId, playerId);
    });

});
