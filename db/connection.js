const environment = 'development';
const config = require('../knexfile')[environment];
module.exports = require('knex')(config);
