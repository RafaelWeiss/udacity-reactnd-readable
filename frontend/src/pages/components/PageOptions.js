import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button } from 'reactstrap';
class PageOptions extends Component {
    goBack = () => {
        this.props.history.goBack();
    };
    goHome = () => {
        this.props.history.push('/');
    };

    render() {
        return (
            <Navbar
                color="light"
                light
                className="navbar shadow-sm p-3 mb-5 bg-white rounded navbar-fixed"
                expand="md"
                style={{ left: 0, top: 0 }}>
                <Button color="info" onClick={() => this.goHome()}>
                    <FontAwesomeIcon icon={faHome} />
                    <span className="button-title">&nbsp;Readable</span>
                </Button>
                {this.props.showBackButton && (
                    <Button color="info" onClick={() => this.goBack()}>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    </Button>
                )}
                {this.props.children}
            </Navbar>
        );
    }
}
export default compose(
    withRouter,
    injectIntl
)(PageOptions);
