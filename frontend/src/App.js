import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

const App = ({ history }) => {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={MainPage} />
            </Switch>
        </ConnectedRouter>
    );
};

App.propTypes = {
    history: PropTypes.object
};

export default App;
