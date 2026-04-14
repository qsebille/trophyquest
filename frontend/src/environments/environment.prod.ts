export const environment = {
  production: true,
  apiUrl: 'http://ec2-35-180-91-5.eu-west-3.compute.amazonaws.com:8080',
  cognito: {
    domain: 'https://trophyquest-prod-auth.auth.eu-west-3.amazoncognito.com',
    clientId: '6ubb4g5jutfssqgn5u8r03rp21',
    redirectUri: 'http://localhost:4200/auth/callback',
    scope: 'openid email profile',
  },
};
