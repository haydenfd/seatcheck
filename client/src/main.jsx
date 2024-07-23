import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { Provider } from "react-redux";
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <Provider>
      <NextUIProvider>
        <Router>
          <App />
        </Router>
      </NextUIProvider>
    // </Provider>
)
