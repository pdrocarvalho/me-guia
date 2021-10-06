const express = require('express');

const routes = express.Router();


routes.get('/', (req, res) => {
    return res.send('Hello world, porra! Dale!')
});


module.exports = routes;