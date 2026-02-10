import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophySuitePageComponent} from './trophy-suite-page.component';
import {ActivatedRoute} from "@angular/router";
import {TrophySuite} from "../../../core/api/dtos/trophy-suite/trophy-suite";
import {TrophySuiteStoreService} from "../../stores/trophy-suite-store.service";
import {TrophySuiteGameDetails} from "../../../core/api/dtos/game/trophy-suite-game-details";

describe('TrophySuitePageComponent', () => {
    let component: TrophySuitePageComponent;
    let fixture: ComponentFixture<TrophySuitePageComponent>;

    let trophySuiteStoreServiceSpy: jasmine.SpyObj<TrophySuiteStoreService>;

    const mockTrophySuite = {
        id: 'trophy-suite-123',
        title: 'Trophy Suite 123',
        platforms: ['ps5'],
        image: 'ts.png'
    } as TrophySuite
    const mockGame = {
        id: 'game-123',
        name: 'Game 123',
        summary: 'Some summary',
        genres: ['Action', 'Adventure'],
        releaseDate: '2023-01-01',
        images: []
    } as TrophySuiteGameDetails
    const mockPlayerId = 'player-123'

    beforeEach(async () => {
        trophySuiteStoreServiceSpy = jasmine.createSpyObj('TrophySuiteStoreService', [
                'reset',
                'retrieve',
                'trophySuite',
                'trophies',
                'game',
                'gameDetails',
                'status',
            ]
        );
        const routeParamMap = new Map<string, string>();
        routeParamMap.set('trophySuiteId', mockTrophySuite.id);
        const routeQueryParamMap = new Map<string, string>();
        routeQueryParamMap.set('playerId', mockPlayerId);

        trophySuiteStoreServiceSpy.trophySuite.and.returnValue(mockTrophySuite)
        trophySuiteStoreServiceSpy.gameDetails.and.returnValue(mockGame)
        trophySuiteStoreServiceSpy.trophies.and.returnValue([])

        await TestBed.configureTestingModule({
            imports: [TrophySuitePageComponent],
            providers: [
                {provide: TrophySuiteStoreService, useValue: trophySuiteStoreServiceSpy},
                {
                    provide: ActivatedRoute,
                    useValue: {snapshot: {paramMap: routeParamMap, queryParamMap: routeQueryParamMap}}
                },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TrophySuitePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create', () => expect(component).toBeTruthy())

});
