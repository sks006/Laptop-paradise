import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuppliers,
  deleteSupplier,
} from "../../Slicer/SupplierSlicer"; // Adjust path as necessary
import { Link } from "react-router-dom";

function Supplier() {
  const dispatch = useDispatch();
  const { suppliers, loading, error } = useSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);



  const columnNames = [
    "Supplier ID",
    "Name",
    "Company",
    "Address",
    "Phone",
    "Action",
  ];

  return (
    <div>
      <h3>Suppliers</h3>

      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <Link to="/createSupplier">
            <button className="btn btn-primary">Add Supplier</button>
          </Link>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <div className="tables">
        <div className="card">
          <h5 className="card-header">Responsive Table</h5>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr className="text-nowrap">
                  {columnNames.map((value) => (
                    <th key={value} className="text-nowrap">
                      {value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {Array.isArray(suppliers)&&suppliers.map((val) => (
                  <tr key={val.id}>
                    <td className="text-nowrap">{val.id}</td>
                    <td className="text-nowrap">{val.name}</td>
                    <td className="text-nowrap">{val.company}</td>
                    <td className="text-nowrap">{val.address}</td>
                    <td className="text-nowrap">{val.phone_no}</td>
                    <td className="text-nowrap">{val.status}</td>
                    <td className="text-nowrap d-flex align-items-center gap-2">
                      
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => dispatch(deleteSupplier(val.id))}
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

      {/* Pagination (dummy for now) */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end m-4">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">
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
}

export default Supplier;
