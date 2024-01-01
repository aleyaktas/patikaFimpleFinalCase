const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");

// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post(
  "/login",
  [
    check("username", "Lütfen geçerli bir username giriniz!").exists(),
    check("password", "Lütfen geçerli bir şifre giriniz!").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;

    try {
      if (!(username === "kodluyoruz" && password === "bootcamp109")) {
        return res.status(400).json({
          msg: "Geçersiz kullanıcı adı veya şifre!",
        });
      }

      jwt.sign(
        {
          username,
        },
        config.get("jwtSecret"),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sunucu hatası");
    }
  }
);

module.exports = router;
