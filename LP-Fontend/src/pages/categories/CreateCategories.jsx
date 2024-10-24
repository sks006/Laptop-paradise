/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCategories } from "../../Slicer/CategoriesSlicer"; // Import your action
import { useNavigate } from "react-router-dom";

const CreateCategories = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("category_name", data.category_name);
    formData.append("category_image", data.category_image[0]);
    formData.append("status", data.status);


    dispatch(createCategories(formData))
      .then(() => navigate("/categories"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h3>Add New Category</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Category Title</label>
          <input
            type="text"
            className="form-control"
            {...register("category_name", {
              required: "Category title is required",
            })}
          />
          {errors.category_name && <p>{errors.category_name.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Category Image</label>
          <input
            type="file"
            className="form-control"
            {...register("category_image", {
              required: "Category image is required",
            })}
          />
          {errors.category_image && <p>{errors.category_image.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-control" {...register("status")}>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCategories;
