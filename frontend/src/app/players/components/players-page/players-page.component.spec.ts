import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayersPageComponent} from './players-page.component';
import {PlayerListStore} from '../../stores/player-list-store';
import {NavigatorService} from "../../../core/services/navigator.service";
import {PlayerCardComponent} from "../player-card/player-card.component";
import {AddPlayerFormComponent} from "../add-player-form/add-player-form.component";

describe('PlayersPageComponent', () => {
    let component: PlayersPageComponent;
    let fixture: ComponentFixture<PlayersPageComponent>;

    let navigatorSpy: jasmine.SpyObj<NavigatorService>;
    let playerListStoreSpy: jasmine.SpyObj<PlayerListStore>;

    const gameId: string = 'game-123';
    const playerId: string = 'player-123';

    beforeEach(async () => {
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToProfilePage', 'goToPlayerTrophySuitePage']);
        playerListStoreSpy = jasmine.createSpyObj('PlayerListStore', ['resetSearch', 'search', 'loadMore', 'addPlayer', 'resetAddPlayerStatus', 'results', 'total', 'status', 'addStatus']);

        playerListStoreSpy.results.and.returnValue([]);

        await TestBed.configureTestingModule({
            imports: [PlayersPageComponent, PlayerCardComponent, AddPlayerFormComponent],
            providers: [
                {provide: NavigatorService, useValue: navigatorSpy},
                {provide: PlayerListStore, useValue: playerListStoreSpy},
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayersPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

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
