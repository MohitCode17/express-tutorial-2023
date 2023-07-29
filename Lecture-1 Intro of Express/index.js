const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello world !</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About us</h1>");
});

app.listen(5000, () => {
    console.log(`Server running on: http://localhost:5000`);
})