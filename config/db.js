const { Sequelize } = require('sequelize');
require('dotenv').config();

// Membuat satu instance sequelize untuk digunakan di seluruh aplikasi
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432, // Default port PostgreSQL
        dialect: 'postgres',
        logging: false, // Set ke true jika ingin melihat query SQL di terminal
    }
);

// Autentikasi koneksi
sequelize.authenticate()
    .then(() => {
        console.log(`✅ Berhasil terhubung ke database: ${process.env.DB_NAME}`);
    })
    .catch(err => {
        console.error('❌ Gagal koneksi ke database:', err.message);
    });

module.exports = sequelize;