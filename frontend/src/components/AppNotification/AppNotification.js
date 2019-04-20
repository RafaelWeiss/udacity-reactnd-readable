import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Notifications from 'react-notification-system-redux';

export function AppNotification({ notifications, intl }) {


    const notificationsIntl = notifications && notifications.map((notification) => {
        if (notification.isTranslated === undefined){
            notification.message = intl.formatMessage({ id: notification.message });
            notification.isTranslated = true;
        }
        return notification;
    })
    

    return <Notifications notifications={notificationsIntl} style={NOTIFICATION_STYLE} />;
}

AppNotification.defaultProps = {
    notifications: []
};

AppNotification.propTypes = {
    notifications: PropTypes.array
};

const notifyTypeStyleForColor = color => ({
    borderLeft: `10px solid ${color}`,
    boxShadow: `
      0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14),
      0px 3px 1px -2px rgba(0, 0, 0, 0.12)
    `
});

export const NOTIFICATION_STYLE = {
    NotificationItem: {
        DefaultStyle: {
            height: '100%',
            backgroundColor: 'white',
            borderRadius: 0,
            borderTop: 'none',
            top: '7px',
            fontWeight: 'bold',
            fontSize: '14px'
        },
        success: notifyTypeStyleForColor('#28a745'),
        info: notifyTypeStyleForColor('#41ffe5'),
        warning: notifyTypeStyleForColor('#f96332'),
        error: notifyTypeStyleForColor('#dc3545')
    },
    Title: {
        success: {color: '#555'},
        error: {color: '#555'},
        warning: {color: '#555'},
        info: {color: '#555'}
    },
    MessageWrapper: {
        success: {color: '#555'},
        error: {color: '#555'},
        warning: {color: '#555'},
        info: {color: '#555'}
    },
    Dismiss: {
        DefaultStyle: {
        display: 'none'
        }
    }
};

function mapStateToProps(state) {
    const { notifications } = state;
    return { notifications };
}

export default compose(
    connect(
        mapStateToProps
    ),
    injectIntl
)(AppNotification);
