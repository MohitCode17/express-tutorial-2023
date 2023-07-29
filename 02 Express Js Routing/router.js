const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to Home Page");
});

router.get("/about", (req, res) => {
    res.send("About Us");
});

router.get("/contact", (req, res) => {
    res.send("Contact Us");
});

router.get("*", (req, res) => {
    res.send("Page not found!");
});

module.exports = router;