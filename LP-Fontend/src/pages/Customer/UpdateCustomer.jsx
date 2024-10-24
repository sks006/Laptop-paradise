import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerById, updateCustomer } from "../../Slicer/CustomerSlicer";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function UpdateCustomer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const update_id = useSelector((state) => state.customer.update_id);
  console.log(update_id);
  
  const [isImageChanged, setIsImageChanged] = useState(0);
 

  // Load customer data on component mount
  useEffect(() => {
    const fetchCustomerData=async()=>{
      const res = await dispatch(fetchCustomerById(update_id));

      const customerData = res.payload;
      setValue("id", customerData.id);
      setValue("name", customerData.name);
      setValue("email", customerData.email);
      setValue("phone", customerData.phone);
      setValue("password", customerData.password);
      setValue("date_of_birth", customerData.date_of_birth);
      setValue("image", customerData.image); // Assuming this is the image field

    }
    fetchCustomerData();

    
  }, [dispatch, update_id, setValue]);

  // Form submit handler
  const onSubmit = (customerData) => {
    const formData = new FormData();
    formData.append("id", customerData.id);
    formData.append("name", customerData.name);
    formData.append("email", customerData.email);
    formData.append("phone", customerData.phone);
    formData.append("password", customerData.password);
    formData.append("date_of_birth", customerData.date_of_birth);

    // If image has been changed, append it to the formData
    if (isImageChanged) {
      formData.append("image", customerData.image[0]); // Fetching the file
    }

    // Dispatch the updateCustomer action with formData
    dispatch(updateCustomer({ upId: update_id, customerData: formData }))
      .unwrap()
      .then(() => {
        navigate("/customers"); // Navigate back to customer list after update
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  // Handle image change
  const handleUpdateImageChange = (e) => {
    setIsImageChanged(1);
    const file = e.target.files[0];
    setValue("image", file); // Update file in the form
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mt-3">
        <label htmlFor="Customer_name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter customer name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <span className="text-danger">{errors.name.message}</span>}
      </div>

      <div className="form-group mt-3">
        <label htmlFor="Customer_email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span className="text-danger">{errors.email.message}</span>}
      </div>

      <div className="form-group mt-3">
        <label htmlFor="Customer_phone" className="form-label">
          Mobile
        </label>
        <input
          type="tel"
          className="form-control"
          placeholder="Enter mobile number"
          {...register("phone", { required: "Phone is required" })}
        />
        {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
      </div>

      <div className="form-group mt-3">
        <label htmlFor="Customer_password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span className="text-danger">{errors.password.message}</span>}
      </div>

      <div className="form-group mt-3">
        <label htmlFor="Customer_DateOfBirth" className="form-label">
          Date of Birth
        </label>
        <input
          type="date"
          className="form-control"
          {...register("date_of_birth", {
            required: "Date of Birth is required",
          })}
        />
        {errors.date_of_birth && (
          <span className="text-danger">{errors.date_of_birth.message}</span>
        )}
      </div>

      <div className="input-group mb-3 shadow p-2 mt-4 bg-white rounded">
        <input
          type="file"
          className="form-control"
          {...register("image")} // Updated field name to "image"
          onChange={handleUpdateImageChange}
        />
        <img
          src={`${import.meta.env.VITE_URL}/uploads/customers/${watch("category_image")}`} // Assuming this is the correct path
          alt="category_image"
          className="rounded-circle w-25"
        />
        <label className="input-group-text">Image</label>
      </div>

      <div className="d-flex mt-3">
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <button
          type="button"
          className="btn btn-danger ms-3"
          onClick={() => navigate("/customers")}
        >
          Close
        </button>
      </div>
    </form>
  );
}

export default UpdateCustomer;
