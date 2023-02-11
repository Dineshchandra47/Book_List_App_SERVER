const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
// router.use(bodyparser());
const cors = require("cors");
router.use(cors());

router.post("/api/user/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    let data = await userModel.findOne({ email: email });
    if (data) {
      return res.status(403).json({
        status: "Failed",
        message: "Email is already Registred",
      });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }
      let user = await userModel.create({
        email: email,
        password: hash,
      });
      res.status(200).json({
        status: "Success",
        message: "Registration Successfull",
        // user
      });
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
});

router.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let data = await userModel.findOne({ email: email });
    if (!data) {
      return res.status(401).json({
        status: "Failed",
        message: "User is NOT Registred",
      });
    }
    bcrypt.compare(password, data.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: data._id,
          },
          "secret"
        );
        return res.status(200).json({
          status: "Login Succesfull",
          token: token,
        });
      } else {
        return res.status(403).json({
          message: "Incorrect Password",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
});

module.exports = router;
