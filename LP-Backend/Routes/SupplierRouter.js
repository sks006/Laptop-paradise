const express = require('express');
const app = express.Router();
const SupplierController = require('./../Controller/SupplierController');


app.get('/',SupplierController.index);
app.post('/save',SupplierController.save);
app.get('/:id',SupplierController.getById);
app.post('/update/:id',SupplierController.update);
app.get('/delete/:id',SupplierController.deleteById);

module.exports = app;