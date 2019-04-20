import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { injectIntl } from 'react-intl';
import LabelContainer from './LabelContainer';
import FormFeedbackContainer from './FormFeedbackContainer';

class InputContainer extends Component {
    getType() {
        return this.props.type ? this.props.type : 'text';
    }

    getId() {
        return this.props.id ? this.props.id : this.props.name;
    }

    render() {
        const {
            type,
            name,
            value,
            placeholder,
            label,
            onChange,
            errors,
            required,
            intl,
            displayLabel,
            ...rest
        } = this.props;
        return (
            <div>
                {displayLabel !== false && <LabelContainer {...this.props} />}
                <Input
                    {...rest}
                    value={value}
                    type={this.getType()}
                    name={name}
                    id={this.getId()}
                    placeholder={intl.formatMessage({ id: placeholder })}
                    onChange={onChange}
                />
                <FormFeedbackContainer className={'d-block'} {...this.props} />
            </div>
        );
    }
}
export default injectIntl(InputContainer);
