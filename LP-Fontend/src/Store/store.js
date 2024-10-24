import { configureStore } from '@reduxjs/toolkit';
import categorySlicer from '../Slicer/CategoriesSlicer';
import BrandSlicer from '../Slicer/BrandSlicer';
import processingSlicer from "../Slicer/ProcessingSlicer"
import CustomerSlicer from '../Slicer/CustomerSlicer'
import ProfileSlicer from '../Slicer/ProfileSlicer'
import BillSlicer from '../Slicer/BillSlicer'
import ProductSlicer from '../Slicer/productSlicer';
import SupplierSlicer from "../Slicer/SupplierSlicer"




const store = configureStore({
  reducer: {
    categories: categorySlicer,
    brands: BrandSlicer,
    processing: processingSlicer,
    customer: CustomerSlicer,
    products: ProductSlicer,
    profile: ProfileSlicer,
    bill: BillSlicer,
    suppliers:SupplierSlicer

  },
});

export default store;
