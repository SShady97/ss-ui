import { MsalAuthProvider, LoginType } from "react-aad-msal";

// Msal Configurations
const config = {
<<<<<<< HEAD
    auth: {
        authority:
            "https://login.microsoftonline.com/4b5a32ae-9cb8-42ea-bcab-26005ef4c06f",
        clientId: "3ab4ab25-d0d2-4946-b13a-7a881a51cb15",
        redirectUri: "http://localhost:3005",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
    },
=======
  auth: {
    authority: 'https://login.microsoftonline.com/4b5a32ae-9cb8-42ea-bcab-26005ef4c06f',
    clientId: '3ab4ab25-d0d2-4946-b13a-7a881a51cb15',
    redirectUri: 'http://localhost:3005'
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true
  }
>>>>>>> 5f5f7e8e5d30c276f8841a558e2994e469e785a1
};

// Authentication Parameters
const authenticationParameters = {
    scopes: ["https://graph.microsoft.com/.default"],
};

// Options
const options = {
    loginType: LoginType.Popup,
    tokenRefreshUri: window.location.origin + "/auth.html",
};

export const authProvider = new MsalAuthProvider(
    config,
    authenticationParameters,
    options
);
