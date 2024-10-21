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
