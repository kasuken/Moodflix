import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ModalProvider} from "./context/ModalProvider";
import {SidebarProvider} from "./context/SidebarProvider";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);