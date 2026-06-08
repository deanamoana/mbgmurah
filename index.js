require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.send('Database Connected');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = app;