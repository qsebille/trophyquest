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

    const trophySuite = {
        id: 'trophy-suite-123',
        title: 'Trophy Suite 123',
        platforms: ['ps5'],
        image: 'ts.png'
    } as TrophySuite
    const game = {
        id: 'game-123',
        name: 'Game 123',
    } as TrophySuiteGameDetails
    const mockPlayerId = 'player-123'

    beforeEach(async () => {
        trophySuiteStoreServiceSpy = jasmine.createSpyObj('TrophySuiteStoreService', [
                'reset',
                'retrieve',
                'trophySuite',
                'trophies',
                'game',
                'status',
            ]
        );
        const routeParamMap = new Map<string, string>();
        routeParamMap.set('trophySuiteId', trophySuite.id);
        const routeQueryParamMap = new Map<string, string>();
        routeQueryParamMap.set('playerId', mockPlayerId);

        trophySuiteStoreServiceSpy.trophySuite.and.returnValue(trophySuite)
        trophySuiteStoreServiceSpy.gameDetails.and.returnValue(game)
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
