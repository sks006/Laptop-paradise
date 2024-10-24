const express = require('express');
const app = express();
const OrdinaryDeviceController = require('./../Controller/OrdinaryDeviceController');


app.get('/', OrdinaryDeviceController.index);
app.post('/save',OrdinaryDeviceController.save);
app.get('/:id', OrdinaryDeviceController.getById);
app.post('/update/:id',OrdinaryDeviceController.update);
app.get('/delete/:id',OrdinaryDeviceController.deleteById);


module.exports = app;