import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQUrC9tUGpei6Zrbm7NNFlJtgImAUBi_c",
  authDomain: "dptalk-pics.firebaseapp.com",
  projectId: "dptalk-pics",
  storageBucket: "dptalk-pics.appspot.com",
  messagingSenderId: "358298343111",
  appId: "1:358298343111:web:3be0e345c8913f9be3d0e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
