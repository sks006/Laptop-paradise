/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  fetchCustomers,
  deleteCustomer,
  setUpdateId
} from "../../Slicer/CustomerSlicer"; // Import CreateCustomer component

const dropdownItems = [
  { text: "10", action: "action" },
  { text: "20", action: "anotherAction" },
  { text: "30", action: "somethingElse" },
];

const ExportItems = [
  { text: "PDF", action: "pdf" },
  { text: "CSV", action: "csv" },
  { text: "Excel", action: "excel" },
];

const Customer = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Form submit handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Perform search logic here with 'data.search'
  };

  const handleCreateCustomer = () => {

    navigate("/createCustomer");
  };
  const handleUpdateCustomer = (id) => {
    dispatch(setUpdateId(id))
    navigate(`/updateCustomer/${id}`);
  };


  const handleDeleteProduct = (id) => {
    dispatch(deleteCustomer(id));
  };

  return (
    <div className="customer-management">
      {/* Search Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex">
        <div className="col-lg-7 search-div d-flex gap-3 align-items-center">
          <div className="mb-3 w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              {...register("search")} // Using react-hook-form's register
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-dark">
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Dropdowns */}
      <div className="dropdown">
        <button
          className="btn m-1 btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          Search Amount
        </button>
        <ul className="dropdown-menu">
          {dropdownItems.map((item, index) => (
            <li key={index}>
              <button
                className="dropdown-item"
                onClick={() => handleItemClick(item.action)}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown">
        <button
          className="btn m-1 btn-info dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          Export
        </button>
        <ul className="dropdown-menu">
          {ExportItems.map((item, index) => (
            <li key={index}>
              <button
                className="dropdown-item"
                onClick={() => handleItemClick(item.action)}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="btn btn-success ms-auto"
        onClick={handleCreateCustomer}
      >
        Add Customer
      </button>

      {/* Customer Table */}
      <h3>All Customers</h3>
      <div className="table-responsive">
        <table className="table w-100">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Password</th>
              <th>Image</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(customers) && customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.password}</td>
                <td>{customer.image}</td>
                <td>{customer.date_of_birth}</td>
                <td>
                  <button
                    onClick={() => handleUpdateCustomer(customer.id)}
                    className="btn btn-info btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(customer.id)}
                    className="btn btn-danger btn-sm"
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
  );
};

export default Customer;
