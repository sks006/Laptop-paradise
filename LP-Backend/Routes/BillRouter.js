const express = require('express');
const app = express.Router();
const BillController = require('../Controller/BillController');


app.get('/', BillController.index);              
app.post('/save', BillController.save);          
app.get('/:id', BillController.getById);           
app.post('/update/:id', BillController.update);   
app.get('/delete/:id', BillController.deleteById);     

module.exports = app;
