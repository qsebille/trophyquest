import {Component, computed, input} from '@angular/core';

@Component({
    selector: 'tq-platform-label',
    imports: [],
    templateUrl: './platform-label.component.html',
    styleUrl: './platform-label.component.scss',
})
export class PlatformLabelComponent {
    readonly platform = input.required<string>();

    readonly sanitizedPlatform = computed(() => {
        switch (this.platform()) {
            case 'PS4':
                return 'PS4';
            case 'PS5':
                return 'PS5';
            default:
                return undefined;
        }
    });
}
