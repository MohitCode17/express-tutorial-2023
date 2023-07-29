const express = require('express');
const reqFilter = require('./middleware');
const app = express();

const port = process.env.port || 3000;


app.get('/', (req, res) => {
    res.send('Welcome to Home Page');
})

app.get('/about', (req, res) => {
    res.send('Welcome to About Page');
})

app.get('/product', reqFilter ,(req, res) => {
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