import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AppModal extends Component {
    render() {
        const { open, title, okText, cancelText, onCancel, onOk, intl, children, hideFooter } = this.props;

        return (
            <Modal isOpen={open} toggle={onCancel} size="lg">
                <ModalHeader toggle={onCancel}>{title}</ModalHeader>
                <ModalBody>{children}</ModalBody>
                {!hideFooter && (
                    <ModalFooter>
                        <Button onClick={onCancel} color="primary">
                            {cancelText || intl.formatMessage({ id: 'button.cancel' })}
                        </Button>
                        <Button onClick={onOk} color="primary">
                            {okText || intl.formatMessage({ id: 'button.ok' })}
                        </Button>
                    </ModalFooter>
                )}
                <ModalFooter />
            </Modal>
        );
    }
}

AppModal.defaultProps = {
    okText: '',
    cancelText: '',
    title: '',
    open: false,
    showActions: true
};

AppModal.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    intl: PropTypes.object.isRequired
};

export default compose(injectIntl)(AppModal);
