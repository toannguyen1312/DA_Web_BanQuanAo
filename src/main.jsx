import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from "./store/store"
import './pages/i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter 
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
        >
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  // {/* </React.StrictMode>, */}
  ,
)
