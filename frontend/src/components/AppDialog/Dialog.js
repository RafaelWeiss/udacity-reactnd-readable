import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../I18n/I18n';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Confirm({ title, open, message, onCancel, onConfirm }) {
    return (
        <Modal isOpen={open} toggle={onCancel} size="sm">
            <ModalHeader toggle={onCancel}>{title || <I18n id="label.attention" />}</ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
                <Button onClick={onCancel} color="primary">
                    <I18n id="button.no" />
                </Button>
                <Button onClick={onConfirm} color="primary">
                    <I18n id="button.yes" />
                </Button>
            </ModalFooter>
        </Modal>
    );
}

Confirm.defaultProps = {
    open: false,
    title: '',
    message: ''
};

Confirm.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default Confirm;
