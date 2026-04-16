export type AuthState = {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  expiresAt: number;
};
