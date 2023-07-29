const express = require('express');
const path = require('path');
const app = express();

const port = 5000;
const publicPath = path.join(__dirname, 'public');


// 👉 Set Template Engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.sendFile(`${publicPath}/index.html`);
});

app.get("/profile", (req, res) => {
    const user = {
        name: 'Mohit Gupta',
        email: 'mohit@gmail.com',
        city: 'Delhi',
    }
    res.render('profile', {user});
});

app.listen(port , ()=> {
    console.log(`Listen at port ${port}`);
});