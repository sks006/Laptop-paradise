const express = require('express');
const app = express();
const StockController = require('../Controller/StockController');


app.get('/', StockController.index);
app.post('/save',StockController.save);
app.get('/:id',StockController.getById);
app.post('/update/:id',StockController.update);
app.get('/delete/:id',StockController.deleteById);


module.exports = app;