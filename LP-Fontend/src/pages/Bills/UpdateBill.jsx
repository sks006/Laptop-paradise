/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBillById, updateBill } from "../../Slicer/BillSlicer";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // Import useForm

const UpdateBills = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.bill.update_bill_id);

  // Initialize React Hook Form and default values
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      customer_id: "",
      cart_id: "",
      total_amount: "",
      payment_status: "",
      delivery_address: "",
      delivery_charge: "",
      status: ""
    }
  });

  // Fetch the bill details when the component mounts
  useEffect(() => {
    console.log(id);
    dispatch(fetchBillById(id));
  }, [dispatch, id]);

  // Set the form values when bill data changes
  useEffect(() => {
    const fetchBillData = async () => {
      const result = await dispatch(fetchBillById(id))
      const data = result.payload;

      // Update form fields using setValue
      setValue("customer_id", data.customer_id || "");
      setValue("cart_id", data.cart_id || "");
      setValue("total_amount", data.total_amount || "");
      setValue("payment_status", data.payment_status || "");
      setValue("delivery_address", data.delivery_address || "");
      setValue("delivery_charge", data.delivery_charge || "");
      setValue("status", data.status || "");
    };

    fetchBillData();
  }, [dispatch, id, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
   
    
    dispatch(updateBill({ upId: id, updateBillData: data })); 
    navigate('/bills'); 
  };

  return (
    <div>
      <h3>Update Bill</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Customer ID</label>
          <input
            type="text"
            name="customer_id"
            className="form-control"
            {...register("customer_id")}  // Register the input with React Hook Form
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cart ID</label>
          <input
            type="text"
            name="cart_id"
            className="form-control"
            {...register("cart_id")}  // Register the input
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Amount</label>
          <input
            type="number"
            name="total_amount"
            className="form-control"
            {...register("total_amount")}  // Register the input
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Status</label>
          <input
            type="text"
            name="payment_status"
            className="form-control"
            {...register("payment_status")}  // Register the input
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Delivery Address</label>
          <input
            type="text"
            name="delivery_address"
            className="form-control"
            {...register("delivery_address")}  // Register the input
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Delivery Charge</label>
          <input
            type="number"
            name="delivery_charge"
            className="form-control"
            {...register("delivery_charge")}  // Register the input
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <input
            type="text"
            name="status"
            className="form-control"
            {...register("status")}  // Register the input
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Bill</button>
      </form>
    </div>
  );
};

export default UpdateBills;
