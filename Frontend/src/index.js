import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ModalProvider} from "./context/ModalProvider";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);