const express = require("express");
const path = require("path");
const port = 5000;
const app = express();
const publicDir = path.join(__dirname, "public");


// static middleware
app.use(express.static('public'));


// routes
app.get("/", (req, res) => {
  res.sendFile(`${publicDir}/index.html`);
})

app.get("/about", (req, res) => {
  res.sendFile(`${publicDir}/about.html`);
})

app.get("*", (req, res) => {
  res.sendFile(`${publicDir}/error.html`);
})

app.listen(port, () => {
  console.log(`Listen at Port ${port}`);
});
