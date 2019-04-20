import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const options = {
    timestamp: 'label.timestamp',
    voteScore: 'label.score',
    author: 'label.author'
};

class OrderByFilter extends Component {
    state = {
        anchorEl: null,
        open: false,
        selectedIndex: 0
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
        const { intl, selected } = this.props;

        return (
            <div>
                <Dropdown isOpen={this.state.open} toggle={this.toggle}>
                    <DropdownToggle caret color="info">
                        <FontAwesomeIcon icon={faSortAmountDown} />
                        <span className="button-title">
                            &nbsp;
                            {intl.formatMessage({
                                id: options[selected] ? options[selected] : 'label.orderBy'
                            })}
                        </span>
                    </DropdownToggle>
                    <DropdownMenu>
                        {Object.keys(options).map((optionKey, index) => (
                            <DropdownItem
                                key={optionKey}
                                selected={optionKey === selected}
                                onClick={(event) =>
                                    this.handleMenuItemClick(event, index, optionKey)
                                }>
                                {intl.formatMessage({ id: options[optionKey] })}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

OrderByFilter.defaultProps = {
    selected: 'voteScore'
};

OrderByFilter.propTypes = {
    selected: PropTypes.oneOf(['voteScore', 'timestamp', 'author']),
    onChange: PropTypes.func.isRequired,
    /* intl */
    intl: PropTypes.object.isRequired
};

export default injectIntl(OrderByFilter);
