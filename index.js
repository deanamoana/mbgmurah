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
        res.status(200).send('Database Connected');
    } catch (err) {
        res.status(500).send('Database Connection Failed: ' + err.message);
    }
});

app.get('/db-test', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({
            success: true,
            message: 'Database connection OK'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// 🔥 AUTO CHECK SUPABASE CONNECTION
sequelize.authenticate()
    .then(() => {
        console.log('✅ Supabase connected successfully');
    })
    .catch((err) => {
        console.error('❌ Supabase connection failed:', err.message);
    });