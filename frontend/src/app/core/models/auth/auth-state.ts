import {AuthUser} from './auth-user';

export type AuthState = {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  expiresAt: number;
  user: AuthUser;
};
