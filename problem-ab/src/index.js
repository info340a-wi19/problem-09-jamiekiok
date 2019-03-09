import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'; //using FA 4.7 atm

import firebase from 'firebase/app';
import 'firebase/auth'; 

import App from './App'; //so our app styling is applied second

//import and configure firebase here

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCzytretyxPmAVHimAkxG03lO6hyEBprpk",
    authDomain: "chirper-jamiekw.firebaseapp.com",
    databaseURL: "https://chirper-jamiekw.firebaseio.com",
    projectId: "chirper-jamiekw",
    storageBucket: "chirper-jamiekw.appspot.com",
    messagingSenderId: "368559295414"
};
firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));