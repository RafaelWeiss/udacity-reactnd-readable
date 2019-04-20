import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button, NavbarToggler } from 'reactstrap';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { locales } from '../../commons/locale/locale';

class NavBar extends React.Component {
    static propTypes = {
        onChangeLanguage: PropTypes.func.isRequired,
        currentLocale: PropTypes.string.isRequired
    };

    handleChangeLanguage = (event) => {
        this.props.onChangeLanguage(event.target.value);
    };

    render() {
        const { intl, history } = this.props;
        return (
            <div
                className="navbar shadow-sm p-3 mb-5 bg-white rounded navbar-fixed navbar navbar-expand-md navbar-light bg-light"
                style={{ right: 10, top: 0 }}>
                <div className="navbar-select-locale">
                    <select value={this.props.currentLocale} onChange={this.handleChangeLanguage}>
                        {locales.map((locale) => (
                            <option key={locale.locale} value={locale.locale}>
                                {intl.formatMessage({ id: locale.label })}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}

NavBar.propTypes = {
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default compose(
    withRouter,
    injectIntl
)(NavBar);
