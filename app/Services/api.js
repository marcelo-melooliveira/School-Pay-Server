const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.mercadopago.com/v1/',
});

module.exports =  api;