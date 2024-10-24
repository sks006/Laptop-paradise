import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchBills,
    fetchBillById,
    createBill,
    updateBill,
    deleteBill
} from './../../Slicer/BillSlicer';

const CreateBills = () => {

    const dispatch = useDispatch();
    const { bills, loading, error } = useSelector((state) => state.bill);

    

    return (
        <div className=''>
            <h3>Edit the bill</h3>
            <div className="card">

                <div className='col-md-12 col-sm-12  rounded'>

                    <form typeof='submit'>

                        <div className='row px-4 mt-4'>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="exampleFormControlSelect1" className="form-label">Customer</label>
                                <select className="form-select" id="exampleFormControlSelect1" defaultValue="" aria-label="Default select example">
                                    <option selected>Choose Product</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className="mb-3 col-md-6">
                                <label htmlFor="exampleFormControlSelect1" className="form-label">Sell</label>
                                <select className="form-select" id="exampleFormControlSelect1" defaultValue="" aria-label="Default select example">
                                    <option selected>Choose Supplier</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className="mb-3 col-md-6">
                                <label for="exampleFormControlInput1" className="form-label">Payment Method</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Open this select method</option>
                                    <option value="1">Card</option>
                                    <option value="2">Bank</option>
                                    <option value="3">Bkash</option>
                                    <option value="3">Nagad</option>
                                    <option value="3">Rocket</option>
                                </select>
                            </div>


                            <div className="mb-3 col-md-6">
                                <label for="exampleFormControlInput1" className="form-label">Paid Amount</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="1400 tk" />
                            </div>

                            <div className='mb-3 col-md-6'>
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Delivery Address</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label for="exampleFormControlInput1" className="form-label">Date</label>
                                <input type="date" className="form-control" id="exampleFormControlInput1" />
                            </div>


                        </div>


                        <div className="p-4">
                            <button className="btn btn-dark">Submit</button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateBills
