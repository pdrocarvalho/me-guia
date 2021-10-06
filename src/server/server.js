const express = require('express');
const mongoose = require ('mongoose');
const routes = require('./routes')

const server =  express();

mongoose.connect('mongodb+srv://meguia:apimeguia159@cluster0.sgr6k.mongodb.net/meguia?retryWrites=true&w=majority');

server.use(express.json());
server.use(routes);

server.listen(3000);