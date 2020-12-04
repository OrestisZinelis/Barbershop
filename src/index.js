import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/rootReducer'

// mock http requests
import '../api';

const persistedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState'))
                       : {}

const store = createStore(rootReducer, persistedState);

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })

const MOUNT_NODE = document.getElementById('react-root');
ReactDOM.render(<Provider store={store}><App /></Provider>, MOUNT_NODE);
