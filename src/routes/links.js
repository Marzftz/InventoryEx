const express = require("express");
const expres = require("express");
const router = expres.Router();
const path = require("path");

const db = require("../database");

//Al realizar un llamado a la url /Login se redireccionara a la pantalla index.hbs
router.get("/login", (req, res) => {
  res.render("layouts/index");
});

router.get("", (req, res) => {
  res.render("layouts/index");
});

router.get("/", (req, res) => {
  res.render("layouts/index");
});

module.exports = router;
