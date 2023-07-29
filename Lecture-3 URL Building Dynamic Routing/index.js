const express = require('express');
const mainRouter = require('./router');
const app = express();
const port = 5000;

app.use(mainRouter);

app.listen(port, () => {
    console.log(`Listen on port ${port}`);
});