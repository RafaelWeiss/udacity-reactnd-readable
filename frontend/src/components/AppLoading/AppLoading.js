import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//import {FormattedMessage} from 'react-intl';
import {selectors as loadingSelectors} from '../../store/reducers/loadingReducer';

import If from '../If/If';
import './appLoading.css';


export function AppLoading({show}) {
    return (
        <If test={show}>
            <div className="app-loading">
                Loading ... 
            </div>
        </If>
    );
}

AppLoading.defaultProps = {
    show: false
};

AppLoading.propTypes = {
    show: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        show: loadingSelectors.getLoadingState(state)
    };
}

export default connect(mapStateToProps)(AppLoading);
