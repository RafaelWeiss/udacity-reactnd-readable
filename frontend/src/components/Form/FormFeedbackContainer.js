import React, { Component } from 'react';
import { FormFeedback } from 'reactstrap';
import I18n from '../I18n/I18n';

class FormFeedbackContainer extends Component {
    render() {
        const { errors } = this.props;
        return (
            <FormFeedback className={this.props.className}>
                {errors && <I18n id={errors} />}
            </FormFeedback>
        );
    }
}
export default FormFeedbackContainer;
