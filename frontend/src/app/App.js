import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {IntlProvider} from 'react-intl';

///import {getIntlProviderConfig} from '../commons/i18n/intl';
import AppNotifications from '../components/AppNotifications/AppNotifications';
import AppLoading from '../components/AppLoading/AppLoading';


import PrincipalPage from '../pages/PrincipalPage'
import PostPage from '../pages/PostPage'
import CategoryPage from '../pages/CategoryPage'


function App() {
    ///const intlProviderProps = getIntlProviderConfig();

    return (
                <div>
                    <Switch>
                            <Route exact path="/" component={PrincipalPage}/>
                            <Route exact path="/:category" component={CategoryPage}/>
                    </Switch>
                </div>
    );
}

export default App;
