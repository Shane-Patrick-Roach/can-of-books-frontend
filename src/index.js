import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Auth0Provider } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

//REference https://manage.auth0.com/dashboard/us/dev-cvqjiqim/applications/KFM1UkLtr5yYtrfW65df4ytdSmLh0HoQ/quickstart

//Got to settings to get the followign and poaste into env
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
