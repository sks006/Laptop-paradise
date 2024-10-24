import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateBrand, fetchBrandById } from "./../../Slicer/BrandSlicer";

const UpdateBrands = () => {
  const dispatch = useDispatch();
  const setBrandId = useSelector((state) => state.brands.setBrandId);
  const [isImageChanged, setIsImageChanged] = useState(0);

  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch brand data and set form values
  useEffect(() => {
    dispatch(fetchBrandById(setBrandId)).then((res) => {
      const { brand_name, brand_image } = res.payload;
      setValue("brand_name", brand_name); // Set form field value
      setValue("brand_image", brand_image); // Set hidden field value (for image preview)
    });
  }, [dispatch, setBrandId, setValue]);

  // Handle file change for the brand image
  const handleUpdateImageChange = (e) => {
    setIsImageChanged(1);
    const file = e.target.files[0];
    setValue("brand_image", file); // Update file in form
  };

  // Form submit handler
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("brand_name", data.brand_name);

    // Append image only if it's changed
    if (isImageChanged) {
      formData.append("brand_image", data.brand_image);
    }

    dispatch(updateBrand({ id: setBrandId, updatedData: formData }));
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#updateBrandModal"
      >
        Update Brand
      </button>

      <div
        className="modal fade"
        id="updateBrandModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="updateBrandLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateBrandLabel">
                Update Brand
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="brandNameUpdate" className="form-label">
                    Brand Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="brandNameUpdate"
                    placeholder="E.g. Asus"
                    {...register("brand_name", {
                      required: "Brand name is required",
                    })}
                  />
                  {errors.brand_name && (
                    <p className="text-danger">{errors.brand_name.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  {/* This hidden input is only for storing the existing image URL */}
                  <input type="hidden" {...register("brand_image")} />
                  <img
                    src={`${import.meta.env.VITE_URL}/uploads/brands/${watch(
                      "brand_image"
                    )}`}
                    alt="Brand"
                    className="rounded-circle w-25"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="updateBrandImageFile" className="form-label">
                    Brand Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="updateBrandImageFile"
                    onChange={handleUpdateImageChange}
                  />
                  <p className="lead mt-2">
                    Please make sure the image ratio is 1050px * 600px!
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBrands;
