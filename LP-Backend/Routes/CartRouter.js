const express = require('express');
const app = express();
const CartController = require('../Controller/CartController');


app.get('/', CartController.index);         
app.post('/save', CartController.save);       
app.get('/:id', CartController.getById);        
app.post('/update/:id', CartController.update);  
app.get('/delete/:id', CartController.deletebyId);  
module.exports = app;
