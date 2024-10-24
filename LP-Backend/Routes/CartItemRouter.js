const express = require('express');
const app = express();
const CartItemController = require('../Controller/CartItemController');


app.get('/', CartItemController.index);            
app.post('/save', CartItemController.save);  
app.get('/:id', CartItemController.getById);       
app.post('/update/:id', CartItemController.update);  
app.get('/delete/:id', CartItemController.deleteById);   
module.exports = app;
