import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProduct } from "../../Slicer/productSlicer"; // Adjust the import path as necessary

const CreateProduct = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createProduct(data));
  };

  return (
    <div>
      <h3>Create Product</h3>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-danger">Title is required</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <span className="text-danger">Description is required</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            {...register("quantity", { required: true })}
          />
          {errors.quantity && (
            <span className="text-danger">Quantity is required</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            {...register("category", { required: true })}
          />
          {errors.category && (
            <span className="text-danger">Category is required</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <input
            type="text"
            className="form-control"
            {...register("brand", { required: true })}
          />
          {errors.brand && (
            <span className="text-danger">Brand is required</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="img" className="form-label">
            Image
          </label>
          <input type="file" className="form-control" {...register("img")} />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
