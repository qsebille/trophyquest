import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'tq-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss',
})
export class AuthCallbackComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  async ngOnInit(): Promise<void> {
    const code = this._route.snapshot.queryParamMap.get('code');
    const state = this._route.snapshot.queryParamMap.get('state');

    await this._authService.handleCallback(code, state);
    this._authService.refreshCurrentUser();
    await this._router.navigate(['/']);
  }
}
