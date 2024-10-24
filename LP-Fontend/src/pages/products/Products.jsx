import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../../Slicer/productSlicer"; // Adjust the import path as necessary

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columnNames = [
    "Product ID",
    "Title",
    "Description",
    "Quantity",
    "Category",
    "Brand",
    "Image",
    "Action",
  ];

  return (
    <div>
      <h3>Products</h3>
      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <Link to="/CreateProduct">
            <button className="btn btn-primary">Add Product</button>
          </Link>
        </div>
        {/* Add search functionality if needed */}
      </div>
      <div className="tables">
        <div className="card">
          <h5 className="card-header">Products List</h5>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr className="text-nowrap">
                  {columnNames.map((value) => (
                    <th key={value}>{value}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8}>Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={8}>Error: {error}</td>
                  </tr>
                ) : (
                  products.map((val) => (
                    <tr key={val.id}>
                      <td>{val.id}</td>
                      <td>{val.title}</td>
                      <td>{val.description}</td>
                      <td>{val.quantity}</td>
                      <td>{val.category}</td>
                      <td>{val.brand}</td>
                      <td>
                        <img src={val.img} alt={val.title} width="50" />
                      </td>
                      <td className="d-flex align-items-center gap-2">
                        <Link to={`/UpdateProducts/${val.id}`}>
                          <button className="btn btn-success btn-sm">
                            <i className="bx bx-edit"></i>
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(val.id)}
                        >
                          <i className="bx bxs-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
