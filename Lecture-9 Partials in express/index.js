const express = require('express');
const app = express();

const port = process.env.port || 3000;


// 👉 Set Template Engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('index', {
        title: "My Home Page"
    });
})


app.get("/about", (req, res) => {
    res.render('about', {
        title: "My About Page"
    });
})

app.get("/profile", (req, res) => {
    res.render('profile', {
        title: "My Profile",
        name: 'Mohit Gupta',
        email: 'mohit@gmail.com',
        city: 'Delhi',
        skills: ['Node', 'Express', 'Mongodb', 'React']
    });
})

app.listen(port , ()=> {
    console.log(`Listen at port ${port}`);
})