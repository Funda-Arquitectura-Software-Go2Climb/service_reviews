const express = require('express');
const bodyParser = require('body-parser');
const serviceReviewsRoutes = require('./routes/service_reviews_routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Middleware para analizar solicitudes JSON entrantes
app.use(bodyParser.json());

// Aquí puedes agregar tus rutas
app.use('/service-reviews', serviceReviewsRoutes);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API de Revisiones',
      version: '1.0.0',
      description: 'Una API simple para gestionar revisiones',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // Mueve esta línea aquí

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
