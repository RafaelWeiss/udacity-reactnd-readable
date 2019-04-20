import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import Select from 'react-select';
import LabelContainer from './LabelContainer';
import FormFeedbackContainer from './FormFeedbackContainer';

class SelectGeneric extends Component {
    handleChange = (option) => {
        this.props.onChange(this.props.name, option ? option.value : '' );
    };

    handleBlur = () => {
        this.props.onBlur(this.props.name, true);
    };

    render() {
        const { name, intl, required, errors, touched, value, label, placeholder, options, ...rest } = this.props;
        return (
            <div>
                <LabelContainer {...this.props} />
                <Select
                    {...rest}
                    id={name}
                    name={name}
                    isClearable={true}
                    value={options.filter((option) => option.value === value)}
                    options={options}
                    onChange={this.handleChange}
                    placeholder={intl.formatMessage({ id: placeholder })}
                    theme={(theme) => ({ ...theme, colors: { ...theme.colors, primary: '#80bdff' } })}
                />
                <FormFeedbackContainer className={'d-block'} {...this.props} />
            </div>
        );
    }
}
export default injectIntl(SelectGeneric);
