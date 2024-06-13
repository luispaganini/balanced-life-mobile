import axios from 'axios';
import appConfig from '../app.json';

const api = axios.create({
    baseURL: appConfig.application.uris.api,
});

// api.interceptors.request.use(
//     request => {
//         console.log('Starting Request', request)
//         return request
//     },
//     error => {
//         console.error('Request Error', error);
//         return Promise.reject(error);
//     }
// );

// api.interceptors.response.use(
//     response => {
//         console.log('Response:', response)
//         return response;
//     },
//     error => {
//         console.error('Response Error:', error);
//         return Promise.reject(error);
//     }
// );

export default api;