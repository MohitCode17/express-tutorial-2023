const express = require("express");
const router = require("./router");

const app = express();

// routes
// app.get("/", (req, res) => {
//     res.send("Welcome to Home Page");
// });

// app.get("/about", (req, res) => {
//     res.send("About Us");
// });

// app.get("/contact", (req, res) => {
//     res.send("Contact Us");
// });

// app.get("*", (req, res) => {
//     res.send("Page not found!");
// });


// import router
app.use(router);

// listen server
app.listen(5000, () => {
    console.log(`Server running on: http://localhost:5000`);
})