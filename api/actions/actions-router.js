// Write your "actions" router here!

const express = require("express");
const Actions = require("./actions-model");

const {
  checkIdActions,
  checkPostActions,
  checkPutActions,
} = require("./actions-middlware");

const router = express.Router();

// Get all actions
router.get("/", async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions)
  } catch (error) {
    next(error)
  }
});

// Get action by ID
router.get("/:id", checkIdActions, (req, res) => {
  res.status(200).json(req.action)
});

// Create a new action
router.post("/", checkPostActions, async (req, res, next) => {
  try {
    const action = await Actions.insert(req.body);
    res.status(201).json(action)
  } catch (error) {
    next(error)
  }
});

// Update action by ID
router.put("/:id", checkIdActions, checkPutActions, async (req, res, next) => {
  try {
    const action = await Actions.update(req.params.id, req.body)
    res.status(200).json(action)
  } catch (error) {
    next(error)
  }
});

// Delete action by ID
router.delete("/:id", checkIdActions, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id)
    res.status(200).json(req.action)
  } catch (error) {
    next(error)
  }
});

module.exports = router;