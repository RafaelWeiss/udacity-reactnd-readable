import React, { Component } from 'react';
import I18n from '../I18n/I18n';
import { Label } from 'reactstrap';
import { injectIntl } from 'react-intl';

class LabelContainer extends Component {
    getLabel() {
        return this.props.label ? this.props.label : 'label.' + this.props.name;
    }

    render() {
        const { name, required } = this.props;
        return (
            <Label htmlFor={name}>
                <I18n id={this.getLabel()} values={this.props.labelParams} />{required && '*'}
            </Label>
        );
    }
}
export default injectIntl(LabelContainer);
