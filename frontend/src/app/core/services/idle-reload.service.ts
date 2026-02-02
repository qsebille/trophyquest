import {Injectable, NgZone, OnDestroy} from '@angular/core';
import {filter, fromEvent, merge, startWith, Subscription, switchMap, tap, timer} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class IdleReloadService implements OnDestroy {
    private readonly _timeoutMs = 60 * 60 * 1000;
    private _sub?: Subscription;

    start() {
        this.stop();

        const activity$ = merge(
            fromEvent(window, 'mousemove'),
            fromEvent(window, 'mousedown'),
            fromEvent(window, 'keydown'),
            fromEvent(window, 'scroll'),
            fromEvent(window, 'touchstart'),
            fromEvent(window, 'click')
        );

        const visible$ = fromEvent(document, 'visibilitychange').pipe(
            startWith(null),
            filter(() => document.visibilityState === 'visible')
        );

        this.ngZone.runOutsideAngular(() => {
            // Timer restarts when: user activity or tab becomes visible
            this._sub = merge(activity$, visible$)
                .pipe(
                    startWith(null),
                    switchMap(() => timer(this._timeoutMs)),
                    tap(() => {
                        // Not triggered if the tab is not visible
                        if (document.visibilityState === 'visible') {
                            location.reload();
                        }
                    })
                )
                .subscribe();
        });
    }

    stop() {
        this._sub?.unsubscribe();
        this._sub = undefined;
    }

    ngOnDestroy() {
        this.stop();
    }

    constructor(private ngZone: NgZone) {
    }
}