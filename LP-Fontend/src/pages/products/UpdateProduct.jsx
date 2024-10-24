import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductsById, updateProduct } from "../../Slicer/productSlicer"; // Adjust the import path as necessary

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("quantity", product.quantity);
      setValue("category", product.category);
      setValue("brand", product.brand);
    }
  }, [product, setValue]);

  const onSubmit = (data) => {
    dispatch(updateProduct({ id, productData: data }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Update Product</h3>
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
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
