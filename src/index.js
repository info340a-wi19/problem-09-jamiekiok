import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom'
import './style-s1.css';
import 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/auth'; 

var config = {
    apiKey: "AIzaSyCkc2p_GO0lLI1-vBUo8MbywEVilZcapT8",
    authDomain: "inkme-340.firebaseapp.com",
    databaseURL: "https://inkme-340.firebaseio.com",
    projectId: "inkme-340",
    storageBucket: "inkme-340.appspot.com",
    messagingSenderId: "896414074906"
  };
  firebase.initializeApp(config);

ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
