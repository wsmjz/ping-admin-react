import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker';
import store from './store';

import { LocaleProvider } from "antd";
import enUs from 'antd/lib/locale-provider/en_US';

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={enUs}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
