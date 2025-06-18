import swaggerJsdoc from "swagger-jsdoc";

const url_api = process.env.URL_API || 'http://localhost:3500'; // Default URL if not set in environment variables


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Express application',
    },
    servers: [
      {
        url: url_api, // Replace with your server URL
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to your API route files
};

const specs = swaggerJsdoc(options);

export default specs;