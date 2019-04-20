import PropTypes from 'prop-types';

function If({ test, children }) {
    return test ? children : false;
}

If.defaultProps = {
    test: false
};

If.propTypes = {
    test: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

export default If;
