/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "../../Slicer/CustomerSlicer";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateCustomer = (data) => {
    // Create FormData to handle file uploads
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Log FormData to verify its contents
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Dispatching with form data
    dispatch(createCustomer(formData))
      .unwrap()
      .then(() => {
        navigate("/customers");
      })
      .catch((err) => {
        console.error(
          "Error creating customer:",
          err.response?.data || err.message
        );
      });
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Customer</h5>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/customers")} // Close button to navigate back
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(handleCreateCustomer)}>
              <div className="form-group mt-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group mt-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group mt-3">
                <label htmlFor="phone" className="form-label">
                  Mobile
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                  <span className="text-danger">{errors.phone.message}</span>
                )}
              </div>

              <div className="form-group mt-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </div>

              <div className="form-group mt-3">
                <label htmlFor="date_of_birth" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date_of_birth"
                  {...register("date_of_birth", {
                    required: "Date of Birth is required",
                  })}
                />
                {errors.date_of_birth && (
                  <span className="text-danger">
                    {errors.date_of_birth.message}
                  </span>
                )}
              </div>

              <div className="input-group mb-3 shadow p-2 mt-4 bg-white rounded">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                  {...register("image", { required: "Image is required" })}
                />
                <label className="input-group-text" htmlFor="inputGroupFile02">
                  Image
                </label>
                {errors.image && (
                  <span className="text-danger">{errors.image.message}</span>
                )}
              </div>

              <div className="d-flex mt-3">
                <button type="submit" className="btn btn-primary">
                  Add
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
