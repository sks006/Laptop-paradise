const express = require('express');
const app = express();
const ProductController = require('../Controller/ProductController');


app.get('/', ProductController.index);              
app.post('/save', ProductController.save);          
app.get('/:id', ProductController.getById);           
app.post('/update/:id', ProductController.update);   
app.get('/delete/:id', ProductController.deleteById);     

module.exports = app;
