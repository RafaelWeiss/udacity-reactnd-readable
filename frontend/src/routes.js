import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SideBar from './components/sidebar/SideBar';
import Content from './components/content/Content';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
///import {IntlProvider} from 'react-intl';

///import {getIntlProviderConfig} from '../commons/i18n/intl';
import AppNotifications from './components/AppNotifications/AppNotifications';
import AppLoading from './components/AppLoading/AppLoading';
import NavBar from './components/content/Navbar';
import PrincipalPage from './pages/PrincipalPage';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        ///const intlProviderProps = getIntlProviderConfig();
        return (
            <div className="app wrapper">
                <AppNotifications />
                <AppLoading />
                <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
                <Container fluid className={classNames('content', { 'is-open': this.state.isOpen })}>
                    <NavBar toggle={this.props.toggle} />
                    <Switch>
                        <Route exact path="/" component={PrincipalPage} />
                        <Route exact path="/:category" component={CategoryPage} />
                        <Route path="/:category/:post" component={PostPage} />
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default App;
