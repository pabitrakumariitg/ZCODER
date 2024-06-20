const express = require("express");
const router = express.Router();
const { handleSignUp } = require("../controller/SignUp");

router.route("/").post(handleSignUp);

module.exports = router;
