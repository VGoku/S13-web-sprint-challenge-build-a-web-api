// add middlewares here related to projects
const Projects = require("./projects-model");

module.exports = {
    checkIdProjects,
    checkPostProjects,
    checkPutProjects,
};

// Check if project exists by ID
async function checkIdProjects(req, res, next) {
    const { id } = req.params;
    try {
        const project = await Projects.get(id);
        if (!project) {
            return res.status(404).json({ message: `Project with ID ${id} not found` })
        }
        req.project = project
        next()
    } catch (error) {
        next(error)
    }
}

// Validate project creation data
function checkPostProjects(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: "name and description are required" })
    }
    next()
}

// Validate project update data
function checkPutProjects(req, res, next) {
    const { name, description } = req.body;
    const completed = req.body.completed !== undefined;
    if (!name || !description || !completed) {
        return res.status(400).json({ message: "name, description, and completed are required" })
    }
    next()
}