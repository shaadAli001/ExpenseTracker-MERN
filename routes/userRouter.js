const express = require("express");
const { loginController, registerController } = require("../controllers/userController");
const router = express.Router();

// login route
router.post("/login", loginController);

// Register route
router.post("/register", registerController);

module.exports=router;