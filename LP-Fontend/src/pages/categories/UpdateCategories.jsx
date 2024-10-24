/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesById, updateCategories } from "../../Slicer/CategoriesSlicer";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const UpdateCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setCategoriesId = useSelector((state) => state.categories.setCategoriesId);

  // Initialize React Hook Form with default values
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      category_name: "",
      category_image: "",
      status: ""
    }
  });

  const [previewImage, setPreviewImage] = useState(null); // Preview for image
  const [isImageChanged, setIsImageChanged] = useState(false); // Track if image has changed

  // Fetch category details when the component mounts or category ID changes
  useEffect(() => {
    const fetchCategoriesData = async () => {
      const res = await dispatch(fetchCategoriesById(setCategoriesId));
      const data = res.payload;

      // Update form fields using setValue
      setValue("category_name", data.category_name || "");
      setValue("status", data.status || "");
      setPreviewImage(`${import.meta.env.VITE_URL}/uploads/categories/${data.category_image}`);
    };

    fetchCategoriesData();
  }, [dispatch, setCategoriesId, setValue]);

  // Handle image change and preview
  const handleImageChange = (e) => {
    setIsImageChanged(true);
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Form submit handler
  const onSubmit = (data) => {
    
    dispatch(updateCategories({ id: setCategoriesId, updatedData: data }));
    navigate("/categories");
  };

  return (
    <div className="container">
      <h3>Update Category</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Category Title */}
        <div className="mb-3">
          <label className="form-label">Category Title</label>
          <input
            type="text"
            className="form-control"
            {...register("category_name", { required: "Category title is required" })}
          />
         
        </div>

        {/* Category Image */}
        <div className="mb-3">
          <label className="form-label">Category Image</label>
          {previewImage && (
            <div className="mb-3">
              <img src={previewImage} alt="Category" className="rounded-circle w-25" />
            </div>
          )}
          <input
            type="file"
            className="form-control"
            {...register("category_image")}
            onChange={handleImageChange} // Handle image change
          />
        </div>

        {/* Category Status */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-control" {...register("status")}>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Update Category</button>
      </form>
    </div>
  );
};

export default UpdateCategories;
