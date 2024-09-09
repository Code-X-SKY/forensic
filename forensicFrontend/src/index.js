import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  /// This is used for all measurment css
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterComponent from './router/router';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  // </React.StrictMode>
    <RouterComponent />
);


reportWebVitals();
