export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/api',
  cognito: {
    domain: 'https://trophyquest-prod-auth.auth.eu-west-3.amazoncognito.com',
    clientId: '6ubb4g5jutfssqgn5u8r03rp21',
    scope: 'openid email profile',
  },
};
