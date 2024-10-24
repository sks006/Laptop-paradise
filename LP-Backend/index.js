const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3700;

const BillRouter = require ('./Routes/BillRouter');
const BrandRouter = require ('./Routes/BrandRouter');
const CartItemRouer = require ('./Routes/CartItemRouter');
const CategoryRouter = require ('./Routes/CategoryRouter');
const CartRouter = require ('./Routes/CartRouter');
const CustomerRouter = require ('./Routes/CustomerRouter');
const StockRouter = require ('./Routes/StockRouter');
const OrdinaryDeviceRouter = require ('./Routes/OrdinaryDeviceRouter');
const SupplierRouetr = require ('./Routes/SupplierRouter');
const processingDeviceRouter = require ('./Routes/ProcessingDeviceRouter');
const ProductRouter = require ('./Routes/ProductRouter');
const cors = require('cors')
const path = require('path')




app.use(express.json());
app.use(cors());

// Define the path to the uploads directory
const uploadsDirectoryPath = path.join(__dirname,'/uploads');
// Use express.static to serve the 'uploads' directory
app.use('/uploads', express.static(uploadsDirectoryPath));





app.use('/bill',BillRouter);
app.use('/brand',BrandRouter);
app.use('/cart_item',CartItemRouer);
app.use('/category',CategoryRouter);
app.use('/cart',CartRouter);
app.use('/customer',CustomerRouter);
app.use('/stock',StockRouter);  
app.use('/ordinary',OrdinaryDeviceRouter);
app.use('/supplier',SupplierRouetr);
app.use('/processing',processingDeviceRouter);
app.use('/product',ProductRouter);


app.get('/', (req,res)=>{
    res.json("Home Route...");
});




app.listen(port,(err)=>{
    if(err) console.log(err);
    else{
        console.log(`Server is running at port: ${port}.`);
    }
});



