import {Component, computed, input, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {AddPlayerStatus} from "../../../core/models/add-player-status.enum";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {SuccessMessageComponent} from "../../../core/components/success-message/success-message.component";

@Component({
    selector: 'tq-add-player-form',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        SuccessMessageComponent
    ],
    templateUrl: './add-player-form.component.html',
    styleUrl: './add-player-form.component.scss',
})
export class AddPlayerFormComponent {
    readonly status = input.required<AddPlayerStatus>();
    readonly addPlayer = output<string>();
    readonly validateSuccess = output<void>();

    inputValue = '';

    readonly isLoading = computed(() => this.status() === AddPlayerStatus.LOADING);
    readonly isAlreadyInDatabase = computed(() => this.status() === AddPlayerStatus.ALREADY_IN_DATABASE);
    readonly hasSucceededAddPlayer = computed(() => this.status() === AddPlayerStatus.ADDED);
    readonly hasFailedAddPlayer = computed(() => this.status() === AddPlayerStatus.ERROR_WHEN_ADDING);

    validate(): void {
        if (!this.isLoading() && this.inputValue !== '') {
            this.addPlayer.emit(this.inputValue);
        }
    }
}
