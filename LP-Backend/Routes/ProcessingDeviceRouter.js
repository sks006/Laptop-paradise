const express = require('express');
const app = express();
const ProcessingDeviceController= require('../Controller/ProcessingDeviceController');


app.get('/', ProcessingDeviceController.index);              
app.post('/save', ProcessingDeviceController.save);          
app.get('/:id', ProcessingDeviceController.getById);           
app.post('/update/:id', ProcessingDeviceController.update);   
app.get('/delete/:id', ProcessingDeviceController.deleteById);     

module.exports = app