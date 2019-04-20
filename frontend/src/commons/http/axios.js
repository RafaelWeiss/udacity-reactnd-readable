import axios from 'axios';

export const registerAxiosInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
            config.headers = config.headers || {};
            config.headers['Authorization'] = 'whatever-you-want';
            return config;
        },
        (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            const unknownError =
                !error || !error.response || !error.response.data || !error.response.data.message;
            let message = unknownError && 'msg.unknownError';

            if (!unknownError && typeof error.response.data.message === 'string') {
                message = error.response.data.message;
            }

            if (!unknownError && error.response.status === 404) {
                message = 'msg.httpNotFound';
            }

            return Promise.reject(message);
        }
    );
};
