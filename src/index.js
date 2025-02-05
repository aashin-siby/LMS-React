/*
 Title : Library Management System - React
Author: Aashin Siby
Created at : 27/01/2025
Updated at : 04/02/2025
Reviewed by : Silpa Madhusoodanan
Reviewed at : 30/01/2025
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
                <App />
        </Router>
    </React.StrictMode>
);