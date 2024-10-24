const express = require('express');
const app = express();
const CategoryController = require('../Controller/CategoryController');


app.get('/', CategoryController.index);
app.post('/save',CategoryController.save);
app.get('/:id',CategoryController.getById);
app.post('/update/:id',CategoryController.update);
app.get('/delete/:id',CategoryController.deleteById);


module.exports = app;