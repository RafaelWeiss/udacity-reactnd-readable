import PropTypes from 'prop-types';


export default PropTypes.shape({
    id: PropTypes.string,
    parentId: PropTypes.string,
    timestamp: PropTypes.number,
    body: PropTypes.string,
    author: PropTypes.string,
    voteScore: PropTypes.number,
    deleted: PropTypes.bool,
    parentDeleted: PropTypes.bool
});