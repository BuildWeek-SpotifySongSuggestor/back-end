const knex = require("knex");
const knexfile = require("../knexfile.js");

const { NODE_ENV } = require('../vars/vars.js');

module.exports = knex(knexfile[NODE_ENV]);