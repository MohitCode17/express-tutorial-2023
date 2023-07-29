const express = require('express');
const app = express();

const port = process.env.port || 3000;


// 👉 Create Middleware

// 🤔 This is application level middleware, it can available every routes

const reqFilter = (req, res, next) => {
    // If user not entered any age
    if(!req.query.age){
        res.send("Please provide your age")
    }
    // If user below 18 years
    else if(req.query.age < 18){
        res.send("You cannot access this site")
    }
    else{
        next();
    }
}

// 👉 Use Middleware in Root file
app.use(reqFilter);


app.get('/', (req, res) => {
    res.send('Welcome to Home Page');
})

app.get('/about', (req, res) => {
    res.send('Welcome to About Page');
})

app.get('/product', (req, res) => {
    res.send([
        {
            id: 1,
            name: "Xiomi Mobile",
            price: 12500,
            color: "Purple",
            status: "In stock",
        },
        {
            id: 2,
            name: "Samsung Galaxy A52s",
            price: 29500,
            color: "Mint",
            status: "Out of stock",
        },
        {
            id: 1,
            name: "Realme 5c",
            price: 19700,
            color: "Sky Radient",
            status: "In Stock",
        },
    ]);
})


app.listen(port, ()=> {
    console.log(`Listen at port ${port}`)
})