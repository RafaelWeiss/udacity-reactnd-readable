import PropTypes from 'prop-types';


export default PropTypes.shape({
    id: PropTypes.string,
    timestamp: PropTypes.number,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
    deleted: PropTypes.bool,
    commentCount: PropTypes.number
});