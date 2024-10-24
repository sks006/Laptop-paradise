import React from "react";

const SellTable = () => {
  const columnNames = [
    "Customer ID",
    "Product Name",
    "Quantity",
    "Category",
    "Total Price",
    "Discount Price",
    "Actions",
  ];

  const ProductList = [
    {
      id: 1,
      title: "Product 1",
      quantity: 10,
      category: "Laptop",
      totalPrice: "5667$",
      discountPrice: "3457$",
    },
    {
      id: 2,
      title: "Product 2",
      quantity: 12,
      category: "Laptop",
      totalPrice: "6000$",
      discountPrice: "4500$",
    },
    {
      id: 3,
      title: "Product 3",
      quantity: 8,
      category: "Phone",
      totalPrice: "3500$",
      discountPrice: "3000$",
    },
    {
      id: 4,
      title: "Product 4",
      quantity: 15,
      category: "Tablet",
      totalPrice: "7500$",
      discountPrice: "5000$",
    },
    // Add more products as necessary
  ];

  return (
    <div>
      <h3>Sell Detail</h3>

      <div className="option-box row">
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
        {/* <!-- Responsive Table --> */}
        <div className="card">
          <h5 className="card-header">Responsive Table</h5>
          <div className="table-responsive text-nowrap ">
            <table className="table w-100 ">
              <thead>
                <tr>
                  {columnNames.map((value) => (
                    <th key={value}>
                      <h6>{value}</h6>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0 ">
                {ProductList.map((val) => (
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.title}</td>
                    <td>{val.quantity}</td>
                    <td>{val.category}</td>
                    <td>{val.totalPrice}</td>
                    <td>{val.discountPrice}</td>
                    <td className="d-flex align-items-center gap-2">
                      <button className="btn btn-success btn-sm">
                        <i className="bx bx-edit"></i>
                      </button>
                      <button className="btn btn-danger btn-sm">
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
      <nav aria-label="Page navigation example ">
        <ul className="pagination justify-content-end m-4 ">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabindex="-1">
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

export default SellTable;
