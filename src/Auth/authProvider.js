import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
// Msal Configurations
const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: '3ab4ab25-d0d2-4946-b13a-7a881a51cb15',
    redirectUri: 'http://localhost:3005'
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true
  }
};
 
// Authentication Parameters
const authenticationParameters = {
  scopes: [
    'https://graph.microsoft.com/.default'
  ]
}
 
// Options
const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin + '/auth.html'
}
 
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)