const express = require("express");
const router = express.Router();
const { handleLogin } = require("../controller/Login");

router.route("/login").post(handleLogin);

module.exports = router;
