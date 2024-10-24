import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, deleteBrand } from "./../../Slicer/BrandSlicer";
import CreateBrand from "./CreateBrands";
import UpdateBrand from "./UpdateBrands";

const Brands = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleDeleteBrand = (id) => {
    dispatch(deleteBrand(id));
  };

  const columnNames = [
    { id: 1, val: "Brand ID" },
    { id: 2, val: "Brand Name" },
    { id: 3, val: "Image" },
    { id: 4, val: "Action" },
  ];

  return (
    <div>
      <h3>Brands</h3>
      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <CreateBrand />
        </div>
      </div>

      <div className="tables">
        <div className="card">
          <h5 className="card-header">Brand List</h5>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr className="text-nowrap">
                  {columnNames.map((value) => (
                    <th key={value.id} className="text-nowrap">
                      {value.val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {Array.isArray(brands)&&brands.map((val) => (
                  <tr key={val.id}>
                    <td className="text-nowrap">{val.id}</td>
                    <td className="text-nowrap">{val.brand_name}</td>
                    <td className="text-nowrap">
                      <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                        >
                          <img
                            src={`${import.meta.env.VITE_URL}/uploads/brands/${val.brand_image}`}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="text-nowrap d-flex align-items-center gap-2">
                      <UpdateBrand brandId={val.id} />
                      <button
                        onClick={() => handleDeleteBrand(val.id)}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="bx bxs-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
