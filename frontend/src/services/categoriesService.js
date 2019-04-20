import request from '../commons/http/request';

const API_URL_BASE = `/categories`;

export default {
    getAllCategories: () => request.query(`${API_URL_BASE}`)
};
