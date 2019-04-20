import { error, success } from 'react-notification-system-redux';
const position = 'tr';

export const showErrorMessage = (errorMessage) =>
    error({
        position,
        message: errorMessage,
        autoDismiss: 0
    });

export const showSuccessMessage = (successMessage) =>
    success({
        position,
        message: successMessage,
        autoDismiss: 5
    });
