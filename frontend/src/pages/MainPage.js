import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import AppNotification from '../components/AppNotification/AppNotification';
import AppLoading from '../components/AppLoading/AppLoading';
import PostListPage from '../pages/PostListPage';
import CategoryPage from '../pages/CategoryPage';
import PostPage from '../pages/PostPage';

import { LOCALE_DEFAULT } from '../commons/locale/locale';
import AppLocale from '../commons/locale';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocale: LOCALE_DEFAULT
        };
    }

    onChangeLanguage = (locale) => {
        this.setState({
            currentLocale: locale
        });
    };

    render() {
        const { currentLocale } = this.state;
        const currentAppLocale = AppLocale[currentLocale];
        return (
            <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
                <div className="app wrapper">
                    <AppNotification />
                    <AppLoading />
                    <Container fluid className={classNames('content')}>
                        <Switch>
                            <Route exact path="/" component={PostListPage} />
                            <Route exact path="/:category/:post" component={PostPage} />
                            <Route exact path="/:category" component={CategoryPage} />                            
                        </Switch>
                    </Container>
                </div>
            </IntlProvider>
        );
    }
}

export default MainPage;
