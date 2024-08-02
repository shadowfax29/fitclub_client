import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose a theme from PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';  // Icons for PrimeReact components
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { AuthProvider } from './context/authcontext';
import {Provider} from "react-redux"
import configureStore from './store/configureStore';
const store=configureStore()
console.log("react-redux",store.getState())
store.subscribe(()=>{
  console.log("reduc state",store.getState())
})
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <Provider store={store}>
<App />
</Provider>
  </AuthProvider>

   

);
