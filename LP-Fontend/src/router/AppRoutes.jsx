import { Route, Routes } from "react-router-dom";
// Layout

import { DashboardPage } from "../pages/DashboardPage";
import Categories from "../pages/categories/Categories";
import CreateCategories from "../pages/categories/CreateCategories";
import UpdateCategories from "../pages/categories/UpdateCategories";

import Products from "../pages/products/Products";
import CreateProduct from "../pages/products/CreateProduct";
import UpdateProduct from "../pages/products/UpdateProduct";

import Supplier from "../pages/Supplier/Supplier";
import CreateSupplier from "../pages/Supplier/CreateSupplier";

import ProcessingDevice from "../pages/Processing/ProcessingDevice";
import CreateProcessing from "../pages/Processing/CreateProcessing";

import Ordinary from "../pages/Ordinary/Ordinary";
import Sells from "../pages/Sells/Sells";
import { Profile } from "../pages/Profile/Profile";

import Brands from "../pages/brands/Brands";
import CreateBrand from "../pages/brands/CreateBrands";
import UpdateBrand from "../pages/brands/UpdateBrands";

import Bills from "../pages/Bills/Bills";
import UpdateBill from "../pages/Bills/UpdateBill";


import Sell from "../pages/Sell/Sell";
import Customer from "../pages/Customer/Customer";
import UpdateCustomer from "../pages/Customer/UpdateCustomer";
import CreateCustomer from "../pages/Customer/CreateCustomer";


const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/createCategories" element={<CreateCategories />} />
        <Route path="/updateCategories/:id" element={<UpdateCategories />} />

        <Route path="/brands" element={<Brands />} />
        <Route path="/createBrand" element={<CreateBrand />} />
        <Route path="/updateBrand/:id" element={<UpdateBrand />} />

        <Route path="/bills" element={<Bills />} />
        <Route path="/updateBills/:id" element={<UpdateBill />} />
        
        <Route path="/customers" element={<Customer />} />
        <Route path="/updateCustomer/:id" element={<UpdateCustomer />} />
        <Route path="/createCustomer" element={<CreateCustomer />} />        
       
        <Route path="/products" element={<Products />} />
        <Route path="/updateProduct" element={<UpdateProduct/>}></Route>
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/createSupplier" element={<CreateSupplier />} />
        <Route path="/processing" element={<ProcessingDevice />} />
        <Route path="/createProcessing" element={<CreateProcessing />} />
        <Route path="/ordinary" element={<Ordinary />} />
        <Route path="/sells" element={<Sells />} />
        <Route path="/sellsItems" element={<Sell />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    );
}
export default AppRoutes;