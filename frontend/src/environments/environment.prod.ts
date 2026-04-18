export const environment = {
  production: true,
  apiUrl: '',
  cognito: {
    domain: 'https://trophyquest-prod-auth.auth.eu-west-3.amazoncognito.com',
    clientId: '6ubb4g5jutfssqgn5u8r03rp21',
    redirectUri: 'https://d33skwwxqd9e21.cloudfront.net/auth/callback',
    scope: 'openid email profile',
  },
};
