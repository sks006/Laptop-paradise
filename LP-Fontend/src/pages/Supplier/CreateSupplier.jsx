import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { createSupplier } from "../../Slicer/SupplierSlicer";

function CreateSupplier() {
  const navigate = useNavigate(); // Use useNavigate hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  // Form submit handler
  const onSubmit = (data) => {
    if(data){
      data.status=1
    }
    dispatch(createSupplier(data))
      .unwrap()
      .then(() => {
        reset(); 
        navigate("/supplier"); 
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="mb-3 col-md-12">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Supplier Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-danger">Name is required</span>}
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Company"
            {...register("company", { required: true })}
          />
          {errors.company && (
            <span className="text-danger">Company is required</span>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="text-danger">Address is required</span>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Phone_no"
            {...register("phone_no", { required: true })}
          />
          {errors.phone && (
            <span className="text-danger">Phone is required</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Add Supplier
        </button>
      </form>
    </div>
  );
}

export default CreateSupplier;
