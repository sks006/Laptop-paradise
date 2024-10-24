const express = require('express');
const app = express();
const BrandController = require('../Controller/BrandController');


app.get('/', BrandController.index);            
app.post('/save', BrandController.save);        
app.get('/:id', BrandController.getById);   
app.post('/update/:id', BrandController.update);  
app.get('/delete/:id', BrandController.deleteById);   

module.exports = app;
