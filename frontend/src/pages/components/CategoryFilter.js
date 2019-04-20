import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import CategoryPropType from '../prop-types/CategoryPropType';

class CategoryFilter extends Component {
    state = {
        anchorEl: null,
        open: false,
        selectedIndex: undefined
    };

    toggle = (event) => {
        this.setState({ open: !this.state.open, anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index, value) => {
        const { onChange } = this.props;
        onChange(value);
        this.setState({ selectedIndex: index, open: false });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { intl, options, selected } = this.props;
        const allCategoriesLabel = intl.formatMessage({ id: 'label.categories' });
        const menuOptions = [
            {
                name: allCategoriesLabel,
                path: ''
            },
            ...options
        ];
        let selectedText = allCategoriesLabel;

        if (selected && options.length) {
            const selectedOption = options.find((option) => option.path === selected);

            selectedOption && selectedOption.name && (selectedText = selectedOption.name);
        }

        return (
            <div>
                <Dropdown direction="down" isOpen={this.state.open} toggle={this.toggle}>
                    <DropdownToggle caret color="info">
                        <FontAwesomeIcon icon={faFilter} />
                        <span className="button-title">&nbsp;{selectedText}</span>
                    </DropdownToggle>
                    <DropdownMenu>
                        {menuOptions.map((option, index) => (
                            <DropdownItem
                                key={option.name}
                                selected={option.path === selected}
                                onClick={(event) => this.handleMenuItemClick(event, index, option.path)}>
                                {option.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

CategoryFilter.defaultProps = {
    selected: '',
    options: []
};

CategoryFilter.propTypes = {
    selected: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(CategoryPropType),
    /* intl */
    intl: PropTypes.object.isRequired
};

export default injectIntl(CategoryFilter);
