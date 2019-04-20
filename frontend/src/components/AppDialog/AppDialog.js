import React, { Component } from 'react';

import IntlMessages from '../I18n/I18n';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AppDialog extends Component {
    state = {
        open: false
    };
    open() {
        this.setState({ open: true });
    }
    close() {
        this.setState({ open: false });
    }

    render() {
        const { title, message, onConfirm, confirmText } = this.props;
        return (
            <Modal isOpen={this.state.open} toggle={() =>this.close()} size="sm">
                <ModalHeader toggle={() =>this.close()}><IntlMessages id={title}/></ModalHeader>
                <ModalBody><IntlMessages id={message} /></ModalBody>
                <ModalFooter>
                    <Button onClick={() => this.close()} color="primary">
                        <IntlMessages id='button.cancel'/>
                    </Button>
                    <Button onClick={onConfirm} color="primary">
                        {confirmText || <IntlMessages id='button.ok'/>}
                    </Button>
                </ModalFooter>
            </Modal>           
        );
    }
}

export default AppDialog;
