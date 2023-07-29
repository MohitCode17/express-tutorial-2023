const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Home Page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>Welcome to About Page</h1>");
});

app.get("/data", (req, res) => {
  res.send([
    {
      name: "Mohit",
      email: "mohit@gmail.com",
      city: "Delhi",
    },
    {
      name: "Ojha",
      email: "ojhatect@gmail.com",
      city: "Nepal",
    },
  ]);
});


app.listen(port, () => {
  console.log(`Listen at Port ${port}`);
});
