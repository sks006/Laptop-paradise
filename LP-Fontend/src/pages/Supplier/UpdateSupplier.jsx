import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Link, useNavigate } from 'react-router-dom';
import {updateSupplier, fetchSupplierById} from "../../Slicer/SupplierSlicer"

function UpdateSupplier() {
    const [upId, setId] = useState()
    const navigate = useNavigate();

  const dispatch = useDispatch();

  const { update_id } = useSelector((state) => state.supplier);

  const [supplierUpdate, setSupplierUpdate] = useState({
    name: '',
    company: '',
    address: '',
    phone_no: '',
    status: '1'
  });

  useEffect(()=>{
    setId(update_id);
   const req=  dispatch(fetchSupplierById(update_id));
   
   req.then((val)=>{
    setSupplierUpdate(val.payload)
    console.log(val.payload);
    
   })

  },[])

  const handleUpdateSupplier = () => {
    
console.log(upId);

    dispatch(updateSupplier({upId,supplierUpdate})).then((res) => {
      // console.log("res",res);
      navigate('/supplier');
      
    }).catch((err) => {
      console.error('Error Updating supplier:', err);
    });

  };



  return (
    <div>
    <h3>Update Supplier</h3>
    <p>Orders placed across your store</p>
    <div className="mb-3 col-md-12">
      <Link to="/supplier">
        <button className='btn btn-primary'>Back</button></Link>
    </div>

    <div className='row'>

      <div className='col-md-12 col-sm-12 bg-light'>

        <form typeof='submit'>
          <h4 className='text-white'>Product information</h4>
          <div className="mb-3">

            <label for="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" placeholder='Name'
            value={supplierUpdate.name}
            onChange={(e)=>{
              setSupplierUpdate({...supplierUpdate, name: e.target.value})
            }}
            />

            <label for="exampleInputEmail1" className="form-label">Company Name</label>
            <input type="text" className="form-control" placeholder='Company Name'
            value={supplierUpdate.company}
            onChange={(e)=>{
              setSupplierUpdate({...supplierUpdate, company: e.target.value})
            }}
            />
            
            <label for="exampleInputEmail1" className="form-label">Address</label>
            <input type="text" className="form-control" placeholder='Address'
            value={setSupplierUpdate.address}
            onChange={(e)=>{
              setSupplierUpdate({...supplierUpdate, address: e.target.value})
            }}
            />
            
            <label for="exampleInputEmail1" className="form-label">Phone Number</label>
            <input type="number" className="form-control" placeholder='Phone Number'
            value={supplierUpdate.phone_no}
            onChange={(e)=>{
              setSupplierUpdate({...supplierUpdate, phone_no: e.target.value})
            }}
            />

          </div>

        </form>
      </div>
      <div className="mb-3">
        <button onClick={()=>handleUpdateSupplier()} className="btn btn-dark">Update</button>
      </div>
    </div>

  </div>
  )
}

export default UpdateSupplier
