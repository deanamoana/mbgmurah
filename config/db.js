const { Sequelize } = require('sequelize');
require('dotenv').config();
import pg from 'pg'; 
const pg = require('pg');


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
    }
);

module.exports = sequelize;