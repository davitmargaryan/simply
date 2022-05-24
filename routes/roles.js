const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/roles.controller.js");

// Retrieve all employees
router.get("/", rolesController.findAll);
// Create a new employee
router.post("/", rolesController.create);
// Retrieve a single employee with id
// router.get("/:id", rolesController.findById);
// // Update a employee with id
// router.put("/:id", rolesController.update);
// // Delete a employee with id
// router.delete("/:id", rolesController.delete);
module.exports = router;
