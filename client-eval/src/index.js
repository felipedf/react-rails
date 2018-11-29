import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import 'semantic-ui-css/semantic.css'
import App from './App';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import employeeReducer from './store/reducers/employeeReducer';
import authReducer from './store/reducers/authReducer';
import feedbackReducer from './store/reducers/feedbackReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  feedback: feedbackReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
