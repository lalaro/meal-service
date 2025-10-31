const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/meal_service_db';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado exitosamente'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: 'Meal Service API',
    service: 'meal-service',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      meals: '/api/meals',
      mealPlans: '/api/meals/plans'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'meal-service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Importar rutas (descomentar cuando las tengas)
const mealRoutes = require('./src/routes/mealRoutes');
app.use('/api/meals', mealRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.path,
    service: 'meal-service'
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Ocurrió un error',
    service: 'meal-service'
  });
});

// Puerto
const PORT = process.env.PORT || 3003;

const server = app.listen(PORT, () => {
  console.log(`🚀 Meal Service ejecutándose en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM recibido, cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado');
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB desconectado');
      process.exit(0);
    });
  });
});

module.exports = app;