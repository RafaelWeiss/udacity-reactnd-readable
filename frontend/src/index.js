import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {registerAxiosInterceptors} from './commons/http/axios';
import configureStore, { history } from './store/store';

const store = configureStore();
const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App history={history} />
        </Provider>,
        document.getElementById('root')
    );
};
registerAxiosInterceptors();
render();
