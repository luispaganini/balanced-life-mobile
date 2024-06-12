import axios from 'axios';
import appConfig from '../app.json';

const api = axios.create({
    baseURL: appConfig.application.uris.api,
});

export default api;