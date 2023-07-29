const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    res.send("The id you specied is :" + req.params.id)
})

router.get('/things/:name/:id', (req, res) => {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
})

router.get('/blog/:id([0-9]{5})', (req, res) => {
    res.send('id: ' + req.params.id);
});

router.get("/", (req, res) => {
    console.log("Data send by browswer ==>>> ", req.query)
    res.send("This is About page");
});

router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});
 

module.exports = router;