import React, { Component } from 'react';

import Dialog from './Dialog';

export default function withDialog(WrappedComponent) {
    return class DialogWrapper extends Component {
        state = {
            open: false,
            message: '',
            confirmCallback: undefined
        };

        handleCancel = () => {
            this.setState({ open: false, message: '', confirmCallback: undefined });
        };

        handleConfirm = () => {
            this.setState((state) => {
                state.confirmCallback && state.confirmCallback();
                return { open: false, message: '', confirmCallback: undefined };
            });
        };

        handleOpen = (message, confirmCallback) => {
            this.setState({ open: true, message, confirmCallback });
        };

        render() {
            const { open, message } = this.state;

            return [
                <WrappedComponent key={0} {...this.props} confirm={this.handleOpen} />,
                <Dialog
                    key={1}
                    open={open}
                    message={message}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            ];
        }
    };
}
