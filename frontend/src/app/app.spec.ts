import {TestBed} from '@angular/core/testing';
import {App} from './app';
import {Component} from '@angular/core';
import {GameCoverStoreService} from "./core/stores/game-cover-store.service";
import {GameCoverImage} from "./core/api/dtos/game/game-cover-image";

describe('App', () => {
    @Component({selector: 'tq-navbar', template: ''})
    class MockNavbarComponent {
    }

    let gameCoverStoreSpy: jasmine.SpyObj<GameCoverStoreService>;

    beforeEach(async () => {
        gameCoverStoreSpy = jasmine.createSpyObj('GameCoverStoreService', ['refreshRandom', 'gameCover']);
        await TestBed.configureTestingModule({
            imports: [MockNavbarComponent],
            providers: [
                {provide: GameCoverStoreService, useValue: gameCoverStoreSpy}
            ]
        }).compileComponents();

        gameCoverStoreSpy.gameCover.and.returnValue({id: '', url: ''} as GameCoverImage);

        TestBed.overrideComponent(App, {
            set: {
                template: '<tq-navbar/>',
                imports: [MockNavbarComponent],
            }
        });
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

});
