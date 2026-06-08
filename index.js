require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Import semua routes
const dapurRoutes = require('./routes/dapurRoutes');
const menuRoutes = require('./routes/menuRoutes');
const sekolahRoutes = require('./routes/sekolahRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000; // Gunakan satu port saja

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Configuration (Gabungan info bisa disesuaikan)
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API MBG Barokah - Integrated Service',
            version: '1.0.0',
            description: 'Dokumentasi API Terpadu untuk Program MBG',
        },
        servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./routes/*.js'], 
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/dapur', dapurRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/sekolah', sekolahRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/distribusi', shipmentRoutes);

app.get('/', (req, res) => {
    res.send(`🚀 Server Utama MBG berjalan di port ${PORT}`);
});

// Database Sync & Server Listen
sequelize.sync({ alter: true })
    .then(() => {
        console.log('--------------------------------------------------');
        console.log(`✅ Database [${process.env.DB_NAME || 'mbg'}] Terkoneksi`);
        console.log(`📖 Dokumentasi API: http://localhost:${PORT}/api-docs`);
        console.log('--------------------------------------------------');
        app.listen(PORT, () => console.log(`🚀 Server berjalan di http://localhost:${PORT}`));
    })
    .catch(err => console.error('❌ Gagal sinkronisasi database:', err.message));