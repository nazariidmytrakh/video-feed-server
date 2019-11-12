const axios = require('axios');

const api = axios.create();

api.interceptors.response.use(
  (response) => (response.data ? response.data : response),
);

module.exports = api;
