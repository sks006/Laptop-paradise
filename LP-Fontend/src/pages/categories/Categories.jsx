/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategories, setCategoriesId } from "../../Slicer/CategoriesSlicer"
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector(
    (state) => state.categories
  ); // Accessing state
  const columnNames = ["Category ID", "Title", "Image", "Action"];

  const handelCategoriesUpdate = (id) => {
    console.log("cate : ", id);
    dispatch(setCategoriesId(id))
    navigate(`/updateCategories/${id}`)
  }

  // Fetch categories on component mount
  useEffect(() => {

    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <h3>Category</h3>
      <div className="option-box row">
        {/* Modal Trigger for adding category */}
        <div className="mb-3 col-md-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/createCategories")}
          >
            Add Category
          </button>
        </div>

        {/* Search functionality */}
        <div className="col-md-12 search-div d-flex gap-3 align-items-center">
          <div className="mb-3 w-50">
            <input type="text" className="form-control" placeholder="Search" />
          </div>
          <div className="mb-3">
            <button className="btn btn-dark">Search</button>
          </div>
        </div>
      </div>

      <div className="tables">
        {/* Responsive Table */}
        <div className="card">
          <h5 className="card-header">Category List</h5>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr className="text-nowrap">
                  {columnNames.map((value) => (
                    <th key={value}>{value}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {Array.isArray(categories) && categories
                  .filter((category) => category !== undefined)
                  .map((category) => (

                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.category_name}</td>
                      <td><img
                        src={`${import.meta.env.VITE_URL}/uploads/catagories/${category.category_image}`}
                        alt="Avatar"
                        className="rounded-circle"
                      /></td>
                      <td className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>

                            handelCategoriesUpdate(category.id)

                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => dispatch(deleteCategories(category.id))}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end m-4">
          <li className="page-item disabled">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Categories;
