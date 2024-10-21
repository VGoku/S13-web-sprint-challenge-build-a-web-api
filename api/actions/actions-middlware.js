// add middlewares here related to actions

const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

module.exports = {
  checkIdActions,
  checkPostActions,
  checkPutActions,
};

// Middleware to check if action ID exists
function checkIdActions(req, res, next) {
  const id = req.params.id;
  Actions.get(id)
  .then(action => {
    if (!action) {
      return res.status(404).json({message: `No actions found with id ${id}` });
    }
    req.action = action
    next()
  })
  .catch(next)
}

// Middleware to validate POST requests for actions
async function checkPostActions(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    return res.status(400).json({
      message: "project_id, description, and notes are required",
    })
  }
  try {
    const project = await Projects.get(project_id);
    if (!project) {
      return res.status(404).json({
        message: `Project with id ${project_id} not found`,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
}

// Middleware to validate PUT requests for actions
async function checkPutActions(req, res, next) {
  const { project_id, description, notes, completed } = req.body;
  if (!project_id || !description || !notes || completed === undefined) {
    return res.status(400).json({
      message: "project_id, description, notes, and completed are required",
    })
  }
  try {
    const project = await Projects.get(project_id);
    if (!project) {
      return res.status(404).json({
        message: `Project with id ${project_id} not found`,
      })
    }
    next()
  }
  catch (error) {
    next(error)
  }
}
