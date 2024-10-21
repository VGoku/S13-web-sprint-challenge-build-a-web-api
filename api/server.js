const express = require('express');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

// Middleware to parse JSON requests
server.use(express.json());

// Logging middleware
server.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} to ${req.url}`);
  next()
});

// API routes
const apiRoutes = () => {
  server.use("/api/actions", actionsRouter);
  server.use("/api/projects", projectsRouter);
};

// Root endpoint
const rootEndpoint = () => {
  server.get("/", (req, res) => {
    res.status(200).json({message: "Hello world"});
  })
};

// 404 Not Found handler
const notFoundHandler = () => {
  server.get("*", (req, res) => {
    res.status(404).json({message: "Nothing to see here..."});
  })
};

// Global error handler
const errorHandler = () => {
  server.use((error, req, res, next) => {// eslint-disable-line
    res.status(500).json({message: error.message});
  })
};

// Initialize the server
const initializeServer = () => {
  apiRoutes()
  rootEndpoint()
  notFoundHandler()
  errorHandler()
};

initializeServer();

module.exports = server;