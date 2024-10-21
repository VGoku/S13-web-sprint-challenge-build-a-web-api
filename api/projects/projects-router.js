// Write your "projects" router here!

const express = require('express');
const Projects = require('./projects-model');
const {
  checkIdProjects,
  checkPostProjects,
  checkPutProjects
} = require('./projects-middleware');

const router = express.Router();

// Get all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

// Get project by ID
router.get('/:id', checkIdProjects, (req, res) => {
  res.status(200).json(req.project);
});

// Create a new project
router.post('/', checkPostProjects, async (req, res, next) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

// Update a project by ID
router.put('/:id', checkIdProjects, checkPutProjects, async (req, res, next) => {
  try {
    const project = await Projects.update(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

// Delete a project by ID
router.delete('/:id', checkIdProjects, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.status(200).json(req.project);
  } catch (error) {
    next(error);
  }
});

// Get actions for a specific project
router.get('/:id/actions', checkIdProjects, async (req, res, next) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;