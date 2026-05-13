import {Component, input, output} from '@angular/core';
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";

@Component({
  selector: 'tq-add-player-form',
  imports: [
    SpinnerContainerComponent
  ],
  templateUrl: './add-player-form.component.html',
  styleUrl: './add-player-form.component.scss',
})
export class AddPlayerFormComponent {
  readonly isLoading = input<boolean>(false);
  readonly onAddPlayer = output<string>();

  validate(pseudo: string): void {
    if (!this.isLoading() && pseudo !== '') {
      this.onAddPlayer.emit(pseudo);
    }
  }
}
