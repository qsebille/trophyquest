import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthState} from '../models/auth/auth-state';
import {AuthUser} from '../models/auth/auth-user';
import {TokenResponse} from '../models/auth/token-response';


@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly domain = environment.cognito.domain;
  private readonly clientId = environment.cognito.clientId;
  private readonly redirectUri = environment.cognito.redirectUri;
  private readonly scope = environment.cognito.scope;

  readonly authState = signal<AuthState | null>(this.restoreAuthState());

  readonly currentUser = computed(() => this.authState()?.user ?? null);
  readonly isAuthenticated = computed(() => {
    const state = this.authState();
    return !!state && state.expiresAt > Date.now();
  });

  async register(): Promise<void> {
    await this.redirectToCognito('/signup');
  }

  async login(): Promise<void> {
    await this.redirectToCognito('/login');
  }

  async handleCallback(code: string | null, state: string | null): Promise<void> {
    if (!code) {
      throw new Error('Missing authorization code');
    }

    const expectedState = sessionStorage.getItem('oauth_state');
    if (!state || state !== expectedState) {
      throw new Error('Invalid OAuth state');
    }

    const codeVerifier = sessionStorage.getItem('pkce_code_verifier');
    if (!codeVerifier) {
      throw new Error('Missing PKCE code verifier');
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      code,
      redirect_uri: this.redirectUri,
      code_verifier: codeVerifier,
    });

    const tokens = await firstValueFrom(
      this.http.post<TokenResponse>(
        `${this.domain}/oauth2/token`,
        body.toString(),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        }
      )
    );

    const user = this.extractUserFromIdToken(tokens.id_token);

    const authState: AuthState = {
      accessToken: tokens.access_token,
      idToken: tokens.id_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + tokens.expires_in * 1000,
      user,
    };

    this.authState.set(authState);
    sessionStorage.setItem('auth_state', JSON.stringify(authState));

    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('pkce_code_verifier');
  }

  logout(): void {
    this.authState.set(null);
    sessionStorage.removeItem('auth_state');
    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('pkce_code_verifier');

    const logoutUrl = new URL(`${this.domain}/logout`);
    logoutUrl.searchParams.set('client_id', this.clientId);
    logoutUrl.searchParams.set('logout_uri', window.location.origin);

    window.location.assign(logoutUrl.toString());
  }

  private async redirectToCognito(path: '/login' | '/signup'): Promise<void> {
    const state = crypto.randomUUID();
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    sessionStorage.setItem('oauth_state', state);
    sessionStorage.setItem('pkce_code_verifier', codeVerifier);

    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      scope: this.scope,
      redirect_uri: this.redirectUri,
      state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });

    window.location.assign(`${this.domain}${path}?${params.toString()}`);
  }

  private extractUserFromIdToken(idToken: string): AuthUser {
    const claims = this.parseJwt<Record<string, any>>(idToken);

    return {
      sub: claims['sub'],
      email: claims['email'],
      name: claims['name'],
    };
  }

  private parseJwt<T>(token: string): T {
    const payload = token.split('.')[1];
    if (!payload) {
      throw new Error('Invalid JWT');
    }

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(normalized);
    return JSON.parse(decoded) as T;
  }

  private generateCodeVerifier(length = 64): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(bytes, b => chars[b % chars.length]).join('');
  }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return this.base64UrlEncode(new Uint8Array(digest));
  }

  private base64UrlEncode(bytes: Uint8Array): string {
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private restoreAuthState(): AuthState | null {
    const raw = sessionStorage.getItem('auth_state');
    if (!raw) {
      return null;
    }

    try {
      const state = JSON.parse(raw) as AuthState;
      return state.expiresAt > Date.now() ? state : null;
    } catch {
      return null;
    }
  }
}
