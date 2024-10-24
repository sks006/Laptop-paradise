const express = require('express');
const app = express();
const CustomerController = require('../Controller/CustomerController');


app.get('/', CustomerController.index);
app.post('/save',CustomerController.save);
app.get('/:id', CustomerController.getById);
app.post('/update/:id',CustomerController.update);
app.get('/delete/:id',CustomerController.deleteById);


module.exports = app;